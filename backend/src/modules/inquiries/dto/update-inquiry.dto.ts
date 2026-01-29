import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { InquiryStatus } from '@prisma/client';

export class UpdateInquiryDTO {
  @IsEnum(InquiryStatus)
  status: InquiryStatus;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  adminNotes?: string;
}
