import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

async function seedTestDatabase() {
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
    },
  })

  const [brand, category] = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'test-brand' },
      update: {},
      create: { name: 'Test Brand', slug: 'test-brand' },
    }),
    prisma.category.upsert({
      where: { slug: 'test-category' },
      update: {},
      create: { name: 'Test Category', slug: 'test-category' },
    }),
  ])

  await prisma.product.upsert({
    where: { reference: 'TEST-001' },
    update: {},
    create: {
      reference: 'TEST-001',
      name: 'Test Product',
      slug: 'test-product',
      description: 'A test product for E2E tests',
      price: 99.99,
      gender: 'UNISEX',
      frameType: 'FULL_RIM',
      shape: 'RECTANGLE',
      brandId: brand.id,
      categoryId: category.id,
      isActive: true,
      images: {
        create: [
          { url: '/uploads/test-product-1.jpg', alt: 'Test', sortOrder: 0 },
        ],
      },
    },
  })

  console.log('Test database seeded successfully')
}

seedTestDatabase()
  .catch((e) => {
    console.error('Failed to seed test database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })