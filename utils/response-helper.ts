import { Response, Request, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    successResponse: (data: unknown, message?: string, code?: number) => Response;
    failResponse: (message?: string, code?: number, data?: unknown) => Response;
    unauthorizedResponse: (message?: string, data?: unknown) => Response;
    notFoundResponse: (message?: string, data?: unknown) => Response;
    validationErrorResponse: (message?: string, errors?: unknown) => Response;
    serverErrorResponse: (message?: string, data?: unknown) => Response;
  }
}

export default function responseHelper(req: Request, res: Response, next: NextFunction) {
  res.successResponse = function (
    data: any,
    message: string = 'Success',
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
    message: string = 'Failed',
    code: number = 400,
    data?: any
  ): Response {
    return res.status(code).json({
      success: false,
      code,
      message,
      data,
    });
  };

  res.unauthorizedResponse = function (
    message: string = 'Unauthorized',
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
    message: string = 'Not Found',
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
    message: string = 'Internal Server Error',
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