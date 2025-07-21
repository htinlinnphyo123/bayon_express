import { Request, Response } from "express";
import * as baseResponse from "@mobile/base/response";
import * as productService from "../services";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.get(req);
    baseResponse.successResponse(res, products, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Internal Server Error");
  }
};


