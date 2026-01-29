-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('user', 'owner', 'admin');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('flat', 'house', 'villa', 'commercial');

-- CreateEnum
CREATE TYPE "PropertyFor" AS ENUM ('rent', 'sale');

-- CreateEnum
CREATE TYPE "FurnishingType" AS ENUM ('furnished', 'semi_furnished', 'unfurnished');

-- CreateEnum
CREATE TYPE "ParkingType" AS ENUM ('none', 'open', 'covered');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('pending', 'contacted', 'closed');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'GrihaHomes User',
    "email" TEXT,
    "password" TEXT,
    "photo" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'user',
    "status" TEXT NOT NULL DEFAULT 'active',
    "failed_login_attempts" INTEGER NOT NULL DEFAULT 0,
    "locked_until" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user_id" UUID NOT NULL,
    "token" TEXT,
    "platform" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "owner_id" UUID NOT NULL,
    "property_type" "PropertyType" NOT NULL,
    "property_for" "PropertyFor" NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "rooms" INTEGER,
    "bathrooms" INTEGER,
    "size_sqft" INTEGER,
    "floor" INTEGER,
    "price" INTEGER,
    "deposit" INTEGER,
    "maintenance" INTEGER,
    "furnishing" "FurnishingType",
    "parking" "ParkingType",
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "status" TEXT NOT NULL DEFAULT 'active',
    "available_from" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_media" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "property_id" UUID NOT NULL,
    "public_id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'image',
    "position" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "property_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "message" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'pending',
    "admin_notes" TEXT,
    "contacted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "devices_user_id_idx" ON "devices"("user_id");

-- CreateIndex
CREATE INDEX "properties_owner_id_idx" ON "properties"("owner_id");

-- CreateIndex
CREATE INDEX "properties_city_idx" ON "properties"("city");

-- CreateIndex
CREATE INDEX "properties_property_type_property_for_status_price_idx" ON "properties"("property_type", "property_for", "status", "price");

-- CreateIndex
CREATE INDEX "property_media_property_id_idx" ON "property_media"("property_id");

-- CreateIndex
CREATE INDEX "inquiries_property_id_idx" ON "inquiries"("property_id");

-- CreateIndex
CREATE INDEX "inquiries_user_id_idx" ON "inquiries"("user_id");

-- CreateIndex
CREATE INDEX "inquiries_status_idx" ON "inquiries"("status");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property_media" ADD CONSTRAINT "property_media_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inquiries" ADD CONSTRAINT "inquiries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
