import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash('Test@1234', 10);

  // Create test users
  const admin = await prisma.user.upsert({
    where: { phone: '+919999999999' },
    update: {},
    create: {
      phone: '+919999999999',
      name: 'Admin User',
      email: 'admin@grihahomes.com',
      password,
      role: 'admin',
      status: 'active',
    },
  });

  const owner = await prisma.user.upsert({
    where: { phone: '+916900000000' },
    update: {},
    create: {
      phone: '+916900000000',
      name: 'Test Owner',
      email: 'owner@grihahomes.com',
      password,
      role: 'owner',
      status: 'active',
    },
  });

  const user = await prisma.user.upsert({
    where: { phone: '+918888888888' },
    update: {},
    create: {
      phone: '+918888888888',
      name: 'Test User',
      email: 'user@grihahomes.com',
      password,
      role: 'user',
      status: 'active',
    },
  });

  console.log('Seeded users:');
  console.log('  Admin:', admin.phone, '| Password: Test@1234');
  console.log('  Owner:', owner.phone, '| Password: Test@1234');
  console.log('  User:', user.phone, '| Password: Test@1234');

  // Create test property
  const property = await prisma.property.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      ownerId: owner.id,
      propertyType: 'flat',
      propertyFor: 'rent',
      title: '2BHK Flat in Andheri West',
      description: 'Spacious 2BHK flat with balcony and great view. Close to metro station.',
      rooms: 2,
      bathrooms: 2,
      sizeSqft: 1000,
      floor: 5,
      price: 35000,
      deposit: 100000,
      maintenance: 3000,
      furnishing: 'semi_furnished',
      parking: 'covered',
      amenities: ['gym', 'swimming_pool', 'security', 'power_backup'],
      address: '123, ABC Complex, Andheri West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400053',
      latitude: 19.1364,
      longitude: 72.8296,
      status: 'active',
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('\nSeeded property:');
  console.log('  ID:', property.id);
  console.log('  Title:', property.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
