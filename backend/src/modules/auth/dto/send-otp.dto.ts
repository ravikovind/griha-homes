import { IsString, IsPhoneNumber } from 'class-validator';

export class SendOtpDTO {
  @IsString()
  @IsPhoneNumber('IN')
  phone: string;
}
