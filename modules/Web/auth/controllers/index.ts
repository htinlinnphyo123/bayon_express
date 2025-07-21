import { Request, Response } from "express";
import * as baseResponse from "@web/base/response";
import { authenticateUser, createUser } from "../services";

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const result = await authenticateUser(email, password);
    if (!result) {
      baseResponse.unAuthorizedResponse(res, 401, "Invalid credentials");
      return;
    }
    baseResponse.successResponse(res, result, 200);
  } catch (error) {
    baseResponse.errorResponse(res, 500, error, "Internal Server Error");
  }
}

export async function register(req: Request, res: Response): Promise<void> {
  const { email, password, name } = req.body;
  try {
    const user = await createUser({ email, password, name });
    baseResponse.successResponse(res, user, 201);
  } catch (err) {
    baseResponse.errorResponse(res, 500, err, "Failed to register user");
  }
}
