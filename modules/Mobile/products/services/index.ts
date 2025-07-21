import { Request } from "express";
import { productRepository } from "@domain/product/product.repository";
import { indexProductResource, IndexProductInterface } from "../resources";

type ProductQueryParams = {
  page?: string;
  limit?: string;
  search?: string;
};

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
    .getWithPaginate(page, limit, search);

  return {
    data: products.data.map(indexProductResource),
    page: products.page,
    limit: products.limit,
    total: products.total,
    totalPages: products.totalPages,
  };
};
