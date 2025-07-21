import { Router } from "express";
import * as productController from "../controllers";

const router: Router = Router();

router.get("/", productController.index);

export default router;
