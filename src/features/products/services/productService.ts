import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export const productService = {
  async findMany(params?: Prisma.ProductFindManyArgs) {
    return prisma.product.findMany({
      ...params,
      include: {
        ...params?.include,
        brand: true,
        category: true,
      },
    })
  },
  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { images: true, brand: true, category: true },
    })
  },
  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data })
  },
  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data })
  },
  async delete(id: string) {
    return prisma.product.delete({ where: { id } })
  },
}