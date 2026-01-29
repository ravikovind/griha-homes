import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { randomUUID } from 'crypto';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFromBuffer(
    buffer: Buffer,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `grihahomes/${folder}`,
            resource_type: 'image',
            transformation: [
              { width: 1200, height: 800, crop: 'limit' },
              { quality: 'auto:good' },
              { format: 'webp' },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result!);
          },
        )
        .end(buffer);
    });
  }

  async delete(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }

  getUrl(publicId: string, transformations?: Record<string, unknown>): string {
    return cloudinary.url(publicId, {
      secure: true,
      ...transformations,
    });
  }

  getThumbnailUrl(publicId: string): string {
    return this.getUrl(publicId, {
      transformation: [{ width: 400, height: 300, crop: 'fill' }],
    });
  }

  generateSignature(propertyID: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const publicId = `grihahomes/properties/${propertyID}/${randomUUID()}`;

    const paramsToSign = {
      timestamp,
      public_id: publicId,
      folder: `grihahomes/properties/${propertyID}`,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      this.configService.get('CLOUDINARY_API_SECRET')!,
    );

    return {
      signature,
      timestamp,
      publicId,
      folder: paramsToSign.folder,
      cloudName: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      apiKey: this.configService.get('CLOUDINARY_API_KEY'),
    };
  }
}
