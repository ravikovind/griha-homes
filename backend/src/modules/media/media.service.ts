import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CloudinaryService } from './cloudinary.service';
import { UploadMediaDTO } from './dto';

const MAX_MEDIA_PER_PROPERTY = 10;

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addMedia(propertyID: string, ownerID: string, dto: UploadMediaDTO) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
      include: { media: true },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to add media to this property');
    }

    if (property.media.length >= MAX_MEDIA_PER_PROPERTY) {
      throw new BadRequestException(
        `Maximum ${MAX_MEDIA_PER_PROPERTY} media files allowed per property`,
      );
    }

    const position = dto.position ?? property.media.length;

    const media = await this.prisma.propertyMedia.create({
      data: {
        propertyId: propertyID,
        publicId: dto.publicId,
        type: dto.type || 'image',
        position,
      },
    });

    return media;
  }

  async deleteMedia(mediaID: string, ownerID: string, isAdmin = false) {
    const media = await this.prisma.propertyMedia.findUnique({
      where: { id: mediaID },
      include: { property: true },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    if (!isAdmin && media.property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to delete this media');
    }

    await this.cloudinaryService.delete(media.publicId);

    await this.prisma.propertyMedia.delete({
      where: { id: mediaID },
    });

    return { message: 'Media deleted successfully' };
  }

  async reorderMedia(propertyID: string, ownerID: string, mediaIds: string[]) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to reorder media');
    }

    await Promise.all(
      mediaIds.map((mediaID, index) =>
        this.prisma.propertyMedia.update({
          where: { id: mediaID },
          data: { position: index },
        }),
      ),
    );

    return { message: 'Media reordered successfully' };
  }

  async getUploadSignature(propertyID: string, ownerID: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to upload to this property');
    }

    return this.cloudinaryService.generateSignature(propertyID);
  }
}
