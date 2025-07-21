import { Response } from "express";

export function successResponse(
  res: Response,
  data: unknown = [],
  code: number = 200,
  message: string = "Success For Web"
) {
  return res.status(code).json({
    success: true,
    code,
    message,
    data,
  });
}

export function unAuthorizedResponse(
  res: Response,
  code: number = 401,
  message: string = "Unauthorized For Web"
) {
  return res.status(code).json({
    success: false,
    code,
    message,
  });
}

export function errorResponse(
  res: Response,
  code: number = 500,
  error: any = {},
  message: string = "Internal Server Error"
) {
  console.error(error);
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : JSON.stringify(error);

  return res.status(code).json({
    success: false,
    code,
    message,
    error: process.env.NODE_ENV !== "production" ? errorMessage : undefined,
  });
}
