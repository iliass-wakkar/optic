import { prisma } from '@/lib/prisma'

export default async function globalTeardown() {
  console.log('Cleaning up test database...')
  try {
    await prisma.productImage.deleteMany()
    await prisma.product.deleteMany()
    await prisma.brand.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()
    console.log('Test database cleaned up')
  } catch (error) {
    console.error('Cleanup failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}