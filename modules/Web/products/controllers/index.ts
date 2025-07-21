import { Request, Response } from "express";
import * as baseResponse from "@web/base/response";
import * as productService from "../services";
import { dd } from '../../../../utils/dd';
import { matchedData } from "express-validator";


/**
 * @route GET /api/web/products
 * @description Get a paginated list of products
 * @access Authenticated
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.get(req);
    baseResponse.successResponse(res, products, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch products");
  }
};


/**
 * @route POST /api/web/products
 * @description Create a new product
 * @access Authenticated 
 */
export const store = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });
    const newProduct = await productService.store(validated);
    baseResponse.successResponse(res, newProduct, 201, "Product created");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to create product");
  }
};


/**
 * @route GET /api/web/products/:id
 * @description Get a specific product by ID
 * @access Authenticated
 */
export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.show(Number(req.params.id));
    if (!product) {
      baseResponse.errorResponse(res, 404, {}, "Product not found");
      return;
    }
    baseResponse.successResponse(res, product, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to fetch product");
  }
};

/**
 * @route PUT /api/web/products
 * @description Update an existing product
 * @access Authenticated
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const validated = matchedData(req, { locations: ["body"] });
    const updatedProduct = await productService.update(validated);
    if (!updatedProduct) {
      baseResponse.errorResponse(res, 404, {}, "Product not found");
      return;
    }
    baseResponse.successResponse(res, updatedProduct, 200, "Product updated");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to update product");
  }
};


/**
 * @route DELETE /api/web/products/:id
 * @description Soft delete a product by ID
 * @access Authenticated
 */
export const destroy = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await productService.softDelete(Number(req.params.id));
    if (!deleted) {
      baseResponse.errorResponse(res, 404, {}, "Product not found");
      return;
    }
    baseResponse.successResponse(res, null, 204, "Product deleted");
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to delete product");
  }
};
