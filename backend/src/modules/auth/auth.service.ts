import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { PrismaService } from '../../common/prisma.service';
import { RegisterDTO, LoginDTO, LoginOtpDTO, ResetPasswordDTO } from './dto';

@Injectable()
export class AuthService {
  private firebaseInitialized = false;

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.initFirebase();
  }

  private initFirebase() {
    const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');

    // Skip if Firebase is not configured (dev mode without Firebase)
    if (!privateKey || privateKey.includes('YOUR_PRIVATE_KEY') || !privateKey.includes('BEGIN PRIVATE KEY')) {
      console.warn('⚠️  Firebase not configured - OTP features disabled');
      return;
    }

    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get('FIREBASE_PROJECT_ID'),
            privateKey: privateKey.replace(/\\n/g, '\n'),
            clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
          }),
        });
        this.firebaseInitialized = true;
      } catch (error) {
        console.warn('⚠️  Firebase initialization failed:', error);
      }
    } else {
      this.firebaseInitialized = true;
    }
  }

  async verifyFirebaseToken(idToken: string): Promise<string> {
    if (!this.firebaseInitialized) {
      throw new BadRequestException('Firebase not configured - OTP verification unavailable');
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (!decodedToken.phone_number) {
        throw new UnauthorizedException('Phone number not found in token');
      }
      return decodedToken.phone_number;
    } catch {
      throw new UnauthorizedException('Invalid or expired OTP token');
    }
  }

  async register(dto: RegisterDTO) {
    const verifiedPhone = await this.verifyFirebaseToken(dto.idToken);

    if (verifiedPhone !== dto.phone) {
      throw new BadRequestException('Phone number mismatch');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this phone number');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        password: hashedPassword,
        name: dto.name,
        email: dto.email,
        role: 'user',
        status: 'active',
      },
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const tokens = await this.generateTokens(user.id, user.phone);

    return {
      user,
      ...tokens,
    };
  }

  async login(dto: LoginDTO) {
    // Phone is required
    if (!dto.phone) {
      throw new BadRequestException('Phone number is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    // User doesn't exist - needs to register with OTP
    if (!user || user.deletedAt) {
      return {
        requiresOtp: true,
        isNewUser: true,
        message: 'Phone not registered. Please verify with OTP to register.',
      };
    }

    // User exists - password is required
    if (!dto.password) {
      throw new BadRequestException('Password is required');
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account is locked. Try again later.');
    }

    if (!user.password) {
      throw new BadRequestException('Password not set. Please reset your password.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: { increment: 1 },
          lockedUntil:
            user.failedLoginAttempts >= 4
              ? new Date(Date.now() + 30 * 60 * 1000)
              : null,
        },
      });
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    const tokens = await this.generateTokens(user.id, user.phone);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async loginWithOtp(dto: LoginOtpDTO) {
    const verifiedPhone = await this.verifyFirebaseToken(dto.idToken);

    if (verifiedPhone !== dto.phone) {
      throw new BadRequestException('Phone number mismatch');
    }

    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user || user.deletedAt) {
      throw new UnauthorizedException('User not found. Please register first.');
    }

    if (user.status !== 'active') {
      throw new UnauthorizedException('Account is inactive');
    }

    // Reset failed attempts on successful OTP login
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    const tokens = await this.generateTokens(user.id, user.phone);

    return {
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      ...tokens,
    };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const verifiedPhone = await this.verifyFirebaseToken(dto.idToken);

    if (verifiedPhone !== dto.phone) {
      throw new BadRequestException('Phone number mismatch');
    }

    const user = await this.prisma.user.findUnique({
      where: { phone: dto.phone },
    });

    if (!user || user.deletedAt) {
      throw new UnauthorizedException('User not found');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    return { message: 'Password reset successful' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || user.deletedAt || user.status !== 'active') {
        throw new UnauthorizedException('User not found or inactive');
      }

      return this.generateTokens(user.id, user.phone);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getMe(userID: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userID },
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        photo: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async generateTokens(userID: string, phone: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userID, phone },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: this.configService.get('JWT_EXPIRES_IN') || '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userID, phone },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
