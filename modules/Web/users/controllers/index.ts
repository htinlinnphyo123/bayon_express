import { Request,Response } from "express";
import * as userService from "@web/users/services";

export const get = async (req: Request, res: Response): Promise<void> => {
    const users = await userService.get();
    res.successResponse(users);
}