import { Product } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export interface ShowProductInterface {
  id: number;
  name: string;
  categoryId: number | null;
  description: string | null;
  imageUrls: string[] | null;
}

export function showProductResource(product: Product): ShowProductInterface {
  const baseUrl = process.env.DIGITALOCEAN_CDN_ENDPOINT || "";
  let urls: string[] | null = null;
  if (Array.isArray(product.imageUrls)) {
    urls = product.imageUrls.map((url) =>
      `${baseUrl}/${url}`
    );
  }
  return {
    id: product.id,
    name: product.name,
    categoryId: product.categoryId,
    description: product.description,
    imageUrls: urls,
  };
}
