import { Response } from "express";

let currentRes: Response | null = null;

export function setResponse(res: Response): void {
  currentRes = res;
}

export function dd(data: any, status: number = 200): void {
  if (!currentRes) {
    throw new Error("Response object not set. Call setResponse(res) before using dd().");
  }

  const stack = new Error().stack?.split("\n")[2]?.trim(); // Caller location

  currentRes.status(status).json({
    success: false,
    output: data,
    location: stack, 
  });
}
