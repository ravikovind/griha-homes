import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreatePropertyDTO, UpdatePropertyDTO, PropertyFiltersDTO } from './dto';
import { Prisma } from '@prisma/client';

const MAX_PROPERTIES_PER_OWNER = 10;

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(ownerID: string, dto: CreatePropertyDTO) {
    const ownerPropertyCount = await this.prisma.property.count({
      where: { ownerId: ownerID, deletedAt: null },
    });

    if (ownerPropertyCount >= MAX_PROPERTIES_PER_OWNER) {
      throw new BadRequestException(
        `Maximum ${MAX_PROPERTIES_PER_OWNER} properties allowed per owner`,
      );
    }

    const property = await this.prisma.property.create({
      data: {
        ...dto,
        ownerId: ownerID,
        availableFrom: dto.availableFrom ? new Date(dto.availableFrom) : null,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
      include: {
        owner: {
          select: { id: true, name: true, phone: true },
        },
        media: true,
      },
    });

    return property;
  }

  async findAll(filters: PropertyFiltersDTO) {
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.PropertyWhereInput = {
      deletedAt: null,
      status: 'active',
      expiresAt: { gt: new Date() },
    };

    if (filters.propertyType) where.propertyType = filters.propertyType;
    if (filters.propertyFor) where.propertyFor = filters.propertyFor;
    if (filters.city) where.city = { contains: filters.city, mode: 'insensitive' };
    if (filters.state) where.state = { contains: filters.state, mode: 'insensitive' };
    if (filters.furnishing) where.furnishing = filters.furnishing;
    if (filters.minPrice || filters.maxPrice) {
      where.price = {
        ...(filters.minPrice && { gte: filters.minPrice }),
        ...(filters.maxPrice && { lte: filters.maxPrice }),
      };
    }
    if (filters.minRooms || filters.maxRooms) {
      where.rooms = {
        ...(filters.minRooms && { gte: filters.minRooms }),
        ...(filters.maxRooms && { lte: filters.maxRooms }),
      };
    }
    if (filters.amenities && filters.amenities.length > 0) {
      where.amenities = { hasEvery: filters.amenities };
    }

    let orderBy: Prisma.PropertyOrderByWithRelationInput = { createdAt: 'desc' };
    if (filters.sortBy === 'price') {
      orderBy = { price: filters.sortOrder || 'asc' };
    }

    if (filters.latitude && filters.longitude && filters.radiusKm) {
      return this.findByLocation(filters, where, skip, limit);
    }

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where,
        include: {
          owner: { select: { id: true, name: true } },
          media: { orderBy: { position: 'asc' }, take: 1 },
        },
        skip,
        take: limit,
        orderBy,
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: properties,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  private async findByLocation(
    filters: PropertyFiltersDTO,
    baseWhere: Prisma.PropertyWhereInput,
    skip: number,
    limit: number,
  ) {
    const { latitude, longitude, radiusKm } = filters;
    const radiusMeters = radiusKm! * 1000;

    const properties = await this.prisma.$queryRaw<
      Array<{ id: string; distance: number }>
    >`
      SELECT id,
        ST_Distance(
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography
        ) as distance
      FROM "Property"
      WHERE "deletedAt" IS NULL
        AND status = 'active'
        AND "expiresAt" > NOW()
        AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radiusMeters}
        )
      ORDER BY distance ASC
      LIMIT ${limit} OFFSET ${skip}
    `;

    const propertyIDs = properties.map((p) => p.id);
    const distanceMap = new Map(properties.map((p) => [p.id, p.distance]));

    if (propertyIDs.length === 0) {
      return { data: [], meta: { page: 1, limit, total: 0, totalPages: 0 } };
    }

    const fullProperties = await this.prisma.property.findMany({
      where: { id: { in: propertyIDs } },
      include: {
        owner: { select: { id: true, name: true } },
        media: { orderBy: { position: 'asc' }, take: 1 },
      },
    });

    const sortedProperties = fullProperties
      .map((p) => ({ ...p, distance: distanceMap.get(p.id) }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));

    const countResult = await this.prisma.$queryRaw<[{ count: bigint }]>`
      SELECT COUNT(*) as count
      FROM "Property"
      WHERE "deletedAt" IS NULL
        AND status = 'active'
        AND "expiresAt" > NOW()
        AND ST_DWithin(
          ST_SetSRID(ST_MakePoint(longitude, latitude), 4326)::geography,
          ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
          ${radiusMeters}
        )
    `;

    const total = Number(countResult[0].count);

    return {
      data: sortedProperties,
      meta: {
        page: filters.page || 1,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByID(propertyID: string) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
      include: {
        owner: { select: { id: true, name: true, phone: true } },
        media: { orderBy: { position: 'asc' } },
      },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }

  async update(propertyID: string, ownerID: string, dto: UpdatePropertyDTO) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to update this property');
    }

    const updated = await this.prisma.property.update({
      where: { id: propertyID },
      data: {
        ...dto,
        availableFrom: dto.availableFrom ? new Date(dto.availableFrom) : undefined,
      },
      include: {
        owner: { select: { id: true, name: true } },
        media: { orderBy: { position: 'asc' } },
      },
    });

    return updated;
  }

  async updateStatus(
    propertyID: string,
    ownerID: string,
    status: string,
    isAdmin = false,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (!isAdmin && property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to update this property');
    }

    const updated = await this.prisma.property.update({
      where: { id: propertyID },
      data: { status },
    });

    return updated;
  }

  async delete(propertyID: string, ownerID: string, isAdmin = false) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyID },
    });

    if (!property || property.deletedAt) {
      throw new NotFoundException('Property not found');
    }

    if (!isAdmin && property.ownerId !== ownerID) {
      throw new ForbiddenException('Not authorized to delete this property');
    }

    await this.prisma.property.update({
      where: { id: propertyID },
      data: { deletedAt: new Date() },
    });

    return { message: 'Property deleted successfully' };
  }

  async findByOwner(ownerID: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      this.prisma.property.findMany({
        where: { ownerId: ownerID, deletedAt: null },
        include: {
          media: { orderBy: { position: 'asc' }, take: 1 },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.property.count({
        where: { ownerId: ownerID, deletedAt: null },
      }),
    ]);

    return {
      data: properties,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
