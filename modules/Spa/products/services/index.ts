import { productRepository } from "@domain/product/product.repository";
import { indexProductResource } from "../resources";

export const get = async () => {
    const products = await productRepository.get();
    return products.map(indexProductResource);
}
