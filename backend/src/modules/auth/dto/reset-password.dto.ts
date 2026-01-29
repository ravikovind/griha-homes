import { IsString, IsPhoneNumber, MinLength } from 'class-validator';

export class ResetPasswordDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  idToken: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}
