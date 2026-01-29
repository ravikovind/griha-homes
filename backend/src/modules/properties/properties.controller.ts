import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import {
  CreatePropertyDTO,
  UpdatePropertyDTO,
  UpdatePropertyStatusDTO,
  PropertyFiltersDTO,
} from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles, Public } from '../../common/decorators';
import { UserRole } from '@prisma/client';

@Controller('properties')
export class PropertiesController {
  constructor(private propertiesService: PropertiesService) {}

  @Public()
  @Get()
  async findAll(@Query() filters: PropertyFiltersDTO) {
    return this.propertiesService.findAll(filters);
  }

  @Public()
  @Get(':property_id')
  async findByID(@Param('property_id') propertyID: string) {
    return this.propertiesService.findByID(propertyID);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.owner, UserRole.admin)
  @Post()
  async create(@CurrentUser('id') ownerID: string, @Body() dto: CreatePropertyDTO) {
    return this.propertiesService.create(ownerID, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.owner, UserRole.admin)
  @Patch(':property_id')
  async update(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') ownerID: string,
    @Body() dto: UpdatePropertyDTO,
  ) {
    return this.propertiesService.update(propertyID, ownerID, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.owner, UserRole.admin)
  @Patch(':property_id/status')
  async updateStatus(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') userID: string,
    @CurrentUser('role') role: UserRole,
    @Body() dto: UpdatePropertyStatusDTO,
  ) {
    return this.propertiesService.updateStatus(
      propertyID,
      userID,
      dto.status,
      role === UserRole.admin,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.owner, UserRole.admin)
  @Delete(':property_id')
  async delete(
    @Param('property_id') propertyID: string,
    @CurrentUser('id') userID: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.propertiesService.delete(propertyID, userID, role === UserRole.admin);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.owner, UserRole.admin)
  @Get('owner/me')
  async findMyProperties(
    @CurrentUser('id') ownerID: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.propertiesService.findByOwner(ownerID, page, limit);
  }
}
