import { IsString, IsOptional, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}

export class AdminUpdateUserDTO extends UpdateUserDTO {
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive';
}
