import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { CreatePropertyDTO } from './create-property.dto';

export class UpdatePropertyDTO extends PartialType(CreatePropertyDTO) {}

export class UpdatePropertyStatusDTO {
  @IsEnum(['active', 'inactive', 'rented', 'sold'])
  status: 'active' | 'inactive' | 'rented' | 'sold';
}
