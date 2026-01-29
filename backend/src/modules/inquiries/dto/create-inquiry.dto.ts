import { IsString, IsUUID, MinLength, MaxLength } from 'class-validator';

export class CreateInquiryDTO {
  @IsUUID()
  propertyId: string;

  @IsString()
  @MinLength(10)
  @MaxLength(500)
  message: string;
}
