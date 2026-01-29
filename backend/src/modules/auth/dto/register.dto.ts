import { IsString, IsPhoneNumber, MinLength, IsOptional, IsEmail } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  idToken: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
