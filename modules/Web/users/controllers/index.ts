import { Request,Response } from "express";
import * as userService from "@web/users/services";

export const get = async (req: Request, res: Response): Promise<void> => {
    // #swagger.parameters['limit'] = { in: 'query', type: 'integer', default: 10 }
    // #swagger.parameters['page'] = { in: 'query', type: 'integer', default: 1 }
    // #swagger.parameters['phoneNumberPrefix'] = { in: 'query', type: 'string', enum: ['+855', '+95'] }
    // #swagger.parameters['username'] = { in: 'query', type: 'string' }
    try{
        const users = await userService.get(req);
        res.successResponse(users);
    } catch(error) {
        res.failResponse(error);
    }
}