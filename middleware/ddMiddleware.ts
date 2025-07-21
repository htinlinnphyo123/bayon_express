import { Request, Response, NextFunction } from "express";
import { setResponse } from "../utils/dd";

export function ddMiddleware(req: Request, res: Response, next: NextFunction) {
  setResponse(res);
  next();
}
