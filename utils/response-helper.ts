import { Response, Request, NextFunction } from 'express';

declare module 'express-serve-static-core' {
  interface Response {
    successResponse: (data: unknown, message?: string, code?: number) => Response;
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

  next();
}
