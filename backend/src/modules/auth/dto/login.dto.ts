import { IsString, IsPhoneNumber, MinLength, IsOptional } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}

export class LoginOtpDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  idToken: string;
}
