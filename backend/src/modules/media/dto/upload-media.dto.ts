import { IsString, IsNumber, IsEnum, Min, Max, IsOptional } from 'class-validator';

export class UploadMediaDTO {
  @IsString()
  publicId: string;

  @IsOptional()
  @IsEnum(['image', 'video'])
  type?: 'image' | 'video';

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(9)
  position?: number;
}

export class ReorderMediaDTO {
  @IsString({ each: true })
  mediaIds: string[];
}
