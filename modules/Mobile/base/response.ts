import { Response } from "express";

export function successResponse(
  res: Response,
  data: unknown = [],
  code: number = 200,
  message: string = "Success For Mobile"
) {
  return res.status(code).json({
    success: true,
    code,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  code: number = 500,
  error: any = {},
  message: string = "Internal Server Error"
) {
  console.error("Error:", error);

  return res.status(code).json({
    success: false,
    code,
    message,
    error: process.env.NODE_ENV !== "production" ? error : undefined,
  });
}
