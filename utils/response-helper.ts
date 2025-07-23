import { Response, Request, NextFunction } from "express";
import * as logger from '@util/logger';
declare module "express-serve-static-core" {
  interface Response {
    successResponse: (
      data: unknown,
      message?: string,
      code?: number
    ) => Response;
    failResponse: (error?: any, code?: number) => Response;
    unauthorizedResponse: (message?: string, data?: unknown) => Response;
    notFoundResponse: (message?: string, data?: unknown) => Response;
    validationErrorResponse: (message?: string, errors?: unknown) => Response;
    serverErrorResponse: (message?: string, data?: unknown) => Response;
  }
}

export default function responseHelper(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.successResponse = function (
    data: any,
    message: string = "Success",
    code: number = 200
  ): Response {
    return res.status(code).json({
      success: true,
      code,
      message,
      data,
    });
  };

  res.failResponse = function (
    error: any = "Failed",
    code: number = 500,
  ): Response {
      const errorMessage =
        typeof error === "string"
          ? error
          : error instanceof Error
          ? error.message
          : JSON.stringify(error);
      logger.error(errorMessage,error);
      return res.status(code).json({
        success: false,
        code,
        error: process.env.NODE_ENV !== "production" ? errorMessage : undefined,
      });
  };

  res.unauthorizedResponse = function (
    message: string = "Unauthorized",
    data?: any
  ): Response {
    return res.status(401).json({
      success: false,
      code: 401,
      message,
      data,
    });
  };

  res.notFoundResponse = function (
    message: string = "Not Found",
    data?: any
  ): Response {
    return res.status(404).json({
      success: false,
      code: 404,
      message,
      data,
    });
  };

  res.serverErrorResponse = function (
    message: string = "Internal Server Error",
    data?: any
  ): Response {
    return res.status(500).json({
      success: false,
      code: 500,
      message,
      data,
    });
  };

  next();
}
