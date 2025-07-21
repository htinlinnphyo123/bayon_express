import { ProductRepositoryInterface } from './productRepository.interface';
import { baseRepository } from '../base/base.repository';
import prisma from '../../../config/db';
import { Product } from '@prisma/client';

const base = baseRepository<Product>(prisma.product);

export const productRepository: ProductRepositoryInterface = {
  ...base,

  getNotDeletedRecords: async (): Promise<Product[]> => {
    return prisma.product.findMany({
      where: { deletedAt: null },
    });
  },
};
