import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { CreateInquiryDTO, UpdateInquiryDTO } from './dto';
import { JwtAuthGuard, RolesGuard } from '../../common/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserRole, InquiryStatus } from '@prisma/client';

@Controller('inquiries')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InquiriesController {
  constructor(private inquiriesService: InquiriesService) {}

  @Post()
  async create(@CurrentUser('id') userID: string, @Body() dto: CreateInquiryDTO) {
    return this.inquiriesService.create(userID, dto);
  }

  @Get('me')
  async findMyInquiries(
    @CurrentUser('id') userID: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.inquiriesService.findByUser(userID, page, limit);
  }

  @Get()
  @Roles(UserRole.admin)
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 20,
    @Query('status') status?: InquiryStatus,
  ) {
    return this.inquiriesService.findAll(page, limit, status);
  }

  @Get(':inquiry_id')
  @Roles(UserRole.admin)
  async findByID(@Param('inquiry_id') inquiryID: string) {
    return this.inquiriesService.findByID(inquiryID);
  }

  @Patch(':inquiry_id')
  @Roles(UserRole.admin)
  async update(
    @Param('inquiry_id') inquiryID: string,
    @Body() dto: UpdateInquiryDTO,
  ) {
    return this.inquiriesService.update(inquiryID, dto);
  }
}
