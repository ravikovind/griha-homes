import {
  Controller,
  Post,
  Delete,
  Patch,
  Get,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { UploadMediaDTO, ReorderMediaDTO } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserRole } from '@prisma/client';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Roles(UserRole.owner, UserRole.admin)
  @Get('properties/:property_id/media/signature')
  async getUploadSignature(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') ownerID: string,
  ) {
    return this.mediaService.getUploadSignature(propertyID, ownerID);
  }

  @Roles(UserRole.owner, UserRole.admin)
  @Post('properties/:property_id/media')
  async addMedia(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') ownerID: string,
    @Body() dto: UploadMediaDTO,
  ) {
    return this.mediaService.addMedia(propertyID, ownerID, dto);
  }

  @Roles(UserRole.owner, UserRole.admin)
  @Patch('properties/:property_id/media/reorder')
  async reorderMedia(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') ownerID: string,
    @Body() dto: ReorderMediaDTO,
  ) {
    return this.mediaService.reorderMedia(propertyID, ownerID, dto.mediaIds);
  }

  @Roles(UserRole.owner, UserRole.admin)
  @Delete('media/:media_id')
  async deleteMedia(
    @Param('media_id') mediaID: string,
    @CurrentUser('id') userID: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.mediaService.deleteMedia(mediaID, userID, role === UserRole.admin);
  }
}
