import { Request,Response } from "express";
import * as userService from "@web/users/services";

export const get = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await userService.get(req);
        res.successResponse(users);
    } catch(error) {
        res.failResponse(error);
    }
}