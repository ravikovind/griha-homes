import { IsOptional, IsEnum, IsNumber, IsString, IsArray, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { PropertyType, PropertyFor, FurnishingType } from '@prisma/client';

export class PropertyFiltersDTO {
  @IsOptional()
  @IsEnum(PropertyType)
  propertyType?: PropertyType;

  @IsOptional()
  @IsEnum(PropertyFor)
  propertyFor?: PropertyFor;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  minRooms?: number;

  @IsOptional()
  @IsNumber()
  @Max(20)
  maxRooms?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsEnum(FurnishingType)
  furnishing?: FurnishingType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : value))
  amenities?: string[];

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  radiusKm?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number;

  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'createdAt' | 'distance';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';
}
