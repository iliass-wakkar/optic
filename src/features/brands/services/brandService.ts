import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export const brandService = {
  async findMany(params?: Prisma.BrandFindManyArgs) {
    return prisma.brand.findMany(params)
  },
  async findById(id: string) {
    return prisma.brand.findUnique({ where: { id } })
  },
  async create(data: Prisma.BrandCreateInput) {
    return prisma.brand.create({ data })
  },
  async update(id: string, data: Prisma.BrandUpdateInput) {
    return prisma.brand.update({ where: { id }, data })
  },
  async delete(id: string) {
    return prisma.brand.delete({ where: { id } })
  },
}