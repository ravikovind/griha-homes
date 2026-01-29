import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO, AdminUpdateUserDTO } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserRole } from '@prisma/client';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  async getMe(@CurrentUser('id') userID: string) {
    return this.usersService.findByID(userID);
  }

  @Patch('me')
  async updateMe(@CurrentUser('id') userID: string, @Body() dto: UpdateUserDTO) {
    return this.usersService.updateMe(userID, dto);
  }

  @Get()
  @Roles(UserRole.admin)
  async findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findAll(page, limit);
  }

  @Get(':user_id')
  @Roles(UserRole.admin)
  async findByID(@Param('user_id') userID: string) {
    return this.usersService.findByID(userID);
  }

  @Patch(':user_id')
  @Roles(UserRole.admin)
  async adminUpdate(
    @Param('user_id') userID: string,
    @Body() dto: AdminUpdateUserDTO,
    @CurrentUser('role') adminRole: UserRole,
  ) {
    return this.usersService.adminUpdate(userID, dto, adminRole);
  }

  @Delete(':user_id')
  @Roles(UserRole.admin)
  async delete(@Param('user_id') userID: string) {
    return this.usersService.softDelete(userID);
  }
}
