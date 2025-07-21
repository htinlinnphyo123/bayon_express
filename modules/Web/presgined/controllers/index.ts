import { Request, Response } from "express";
import * as baseResponse from "@web/base/response";
import * as presignedService from "../services";

/**
 * @route POST /api/web/get-presigned-urls
 * @desc Generate presigned upload URLs
 * @access Authenticated
 */
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const urls = await presignedService.generatePresignedUrls(req.body.files);
    baseResponse.successResponse(res, { urls }, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Failed to generate presigned URLs");
  }
};
