import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export const categoryService = {
  async findMany(params?: Prisma.CategoryFindManyArgs) {
    return prisma.category.findMany(params)
  },
  async findById(id: string) {
    return prisma.category.findUnique({ where: { id } })
  },
  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data })
  },
  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data })
  },
  async delete(id: string) {
    return prisma.category.delete({ where: { id } })
  },
}