import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateInquiryDTO, UpdateInquiryDTO } from './dto';
import { InquiryStatus } from '@prisma/client';

const MAX_INQUIRIES_PER_DAY = 10;
const DUPLICATE_WINDOW_HOURS = 24;

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(userID: string, dto: CreateInquiryDTO) {
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property || property.deletedAt || property.status !== 'active') {
      throw new NotFoundException('Property not found or inactive');
    }

    const duplicateWindowStart = new Date(
      Date.now() - DUPLICATE_WINDOW_HOURS * 60 * 60 * 1000,
    );

    const existingInquiry = await this.prisma.inquiry.findFirst({
      where: {
        userId: userID,
        propertyId: dto.propertyId,
        createdAt: { gte: duplicateWindowStart },
      },
    });

    if (existingInquiry) {
      throw new BadRequestException(
        'You have already inquired about this property in the last 24 hours',
      );
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const inquiriesToday = await this.prisma.inquiry.count({
      where: {
        userId: userID,
        createdAt: { gte: todayStart },
      },
    });

    if (inquiriesToday >= MAX_INQUIRIES_PER_DAY) {
      throw new BadRequestException(
        `Maximum ${MAX_INQUIRIES_PER_DAY} inquiries allowed per day`,
      );
    }

    const inquiry = await this.prisma.inquiry.create({
      data: {
        userId: userID,
        propertyId: dto.propertyId,
        message: dto.message,
        status: InquiryStatus.pending,
      },
      include: {
        property: {
          select: { id: true, title: true, city: true },
        },
      },
    });

    return inquiry;
  }

  async findAll(page = 1, limit = 20, status?: InquiryStatus) {
    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [inquiries, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, phone: true } },
          property: { select: { id: true, title: true, city: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.inquiry.count({ where }),
    ]);

    return {
      data: inquiries,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findByID(inquiryID: string) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryID },
      include: {
        user: { select: { id: true, name: true, phone: true, email: true } },
        property: {
          select: {
            id: true,
            title: true,
            city: true,
            address: true,
            price: true,
            owner: { select: { id: true, name: true, phone: true } },
          },
        },
      },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    return inquiry;
  }

  async findByUser(userID: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      this.prisma.inquiry.findMany({
        where: { userId: userID },
        include: {
          property: {
            select: { id: true, title: true, city: true },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.inquiry.count({ where: { userId: userID } }),
    ]);

    return {
      data: inquiries,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async update(inquiryID: string, dto: UpdateInquiryDTO) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: inquiryID },
    });

    if (!inquiry) {
      throw new NotFoundException('Inquiry not found');
    }

    const updated = await this.prisma.inquiry.update({
      where: { id: inquiryID },
      data: {
        status: dto.status,
        adminNotes: dto.adminNotes,
        contactedAt: dto.status === InquiryStatus.contacted ? new Date() : undefined,
      },
      include: {
        user: { select: { id: true, name: true, phone: true } },
        property: { select: { id: true, title: true } },
      },
    });

    return updated;
  }
}
