import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PropertyType, PropertyFor, FurnishingType, ParkingType } from '@prisma/client';

export class CreatePropertyDTO {
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsEnum(PropertyFor)
  propertyFor: PropertyFor;

  @IsString()
  @MinLength(10)
  @MaxLength(100)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsNumber()
  @Min(1)
  @Max(20)
  rooms: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  bathrooms: number;

  @IsNumber()
  @Min(100)
  sizeSqft: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  floor?: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  deposit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maintenance?: number;

  @IsOptional()
  @IsEnum(FurnishingType)
  furnishing?: FurnishingType;

  @IsOptional()
  @IsEnum(ParkingType)
  parking?: ParkingType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  pincode: string;

  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @IsOptional()
  @IsDateString()
  availableFrom?: string;
}
