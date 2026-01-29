import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO, LoginDTO, LoginOtpDTO, ResetPasswordDTO } from './dto';
import { Public, CurrentUser } from '../../common/decorators';
import { JwtAuthGuard } from '../../common/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('login-otp')
  async loginWithOtp(@Body() dto: LoginOtpDTO) {
    return this.authService.loginWithOtp(dto);
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDTO) {
    return this.authService.resetPassword(dto);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser('id') userID: string) {
    return this.authService.getMe(userID);
  }
}
