import { Request } from "express";
import { productRepository } from "@domain/product/product.repository";
import { indexProductResource, IndexProductInterface } from "../resources";
import { showProductResource, ShowProductInterface } from "../resources/show";
import { Product } from "@prisma/client";

type ProductQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
};

//  GET ALL with pagination
export const get = async (
  req: Request<any, any, any, ProductQueryParams>
): Promise<{
  data: IndexProductInterface[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}> => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);
  const search = req.query.search || "";

  const products = await productRepository
    .with("category:id,name")
    .order("id", "asc")
    .getWithPaginate(page, limit, search);

  return {
    data: products.data.map(indexProductResource),
    page: products.page,
    limit: products.limit,
    total: products.total,
    totalPages: products.totalPages,
  };
};

//  GET SINGLE PRODUCT
export const show = async (id: number): Promise<ShowProductInterface | null> => {
  const product: Product | null = await productRepository.find(id);
  return product ? showProductResource(product) : null;
};

//  CREATE PRODUCT
export const store = async (
  data: Partial<Product>
): Promise<Product> => {
  return productRepository.create(data);
};

//  UPDATE PRODUCT
export const update = async (
  data: Partial<Product>
): Promise<Product | null> => {
  console.log(data);
  
  const existing = await productRepository.find(Number(data.id));
  if (!existing) return null;
  return productRepository.update(Number(data.id), data);
};

//  DELETE PRODUCT (Soft Delete by default)
export const softDelete = async (
  id: number,
  deletedBy?: number
): Promise<Product | null> => {
  const existing = await productRepository.find(id);
  if (!existing) return null;

  return productRepository.softDelete(id, deletedBy);
};

//  HARD DELETE (Permanent delete from the table no recover)
export const hardDelete = async (id: number): Promise<Product | null> => {
  const existing = await productRepository.find(id);
  if (!existing) return null;

  return productRepository.delete(id);
};
