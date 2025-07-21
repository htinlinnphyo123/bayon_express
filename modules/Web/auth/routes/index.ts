import { Router } from "express";
import * as authController from "../controllers";
import { loginAuthValidator, registerAuthValidator } from "../validations";
import {validateRequest} from "@web/base/validateRequest";


const router: Router = Router();

router.post("/login",loginAuthValidator, validateRequest, authController.login);
router.post("/register",registerAuthValidator, validateRequest, authController.register);

export default router;
