import { Router } from "express";
import * as presignedController from "../controllers";
import { authenticate } from "@web/base/auth";

const router: Router = Router();

router.post("/", authenticate, presignedController.index);

export default router;
