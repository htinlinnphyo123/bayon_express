import { Product } from "@prisma/client";
import { BaseRepositoryInterface } from "../base/baseRepository.interface";

export interface ProductRepositoryInterface extends BaseRepositoryInterface<Product> {
  getNotDeletedRecords(): Promise<Product[]>;
}
