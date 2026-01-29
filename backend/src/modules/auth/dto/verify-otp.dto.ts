import { IsString, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;

  @IsString()
  idToken: string;
}
