import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { UpdateUserDTO, AdminUpdateUserDTO } from './dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByID(userID: string) {
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
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateMe(userID: string, dto: UpdateUserDTO) {
    const user = await this.prisma.user.update({
      where: { id: userID },
      data: dto,
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        photo: true,
        role: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: { deletedAt: null },
        select: {
          id: true,
          phone: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where: { deletedAt: null } }),
    ]);

    return {
      data: users,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async adminUpdate(userID: string, dto: AdminUpdateUserDTO, adminRole: UserRole) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: userID },
    });

    if (!targetUser || targetUser.deletedAt) {
      throw new NotFoundException('User not found');
    }

    if (targetUser.role === 'admin' && adminRole !== 'admin') {
      throw new ForbiddenException('Cannot modify admin user');
    }

    const user = await this.prisma.user.update({
      where: { id: userID },
      data: dto,
      select: {
        id: true,
        phone: true,
        name: true,
        email: true,
        role: true,
        status: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async softDelete(userID: string) {
    await this.prisma.user.update({
      where: { id: userID },
      data: { deletedAt: new Date() },
    });

    return { message: 'User deleted successfully' };
  }
}
