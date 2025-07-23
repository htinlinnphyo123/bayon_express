import { Router } from "express";
import * as userController from "@web/users/controllers";
const router: Router = Router();

router.get('/',userController.get);

export default router;