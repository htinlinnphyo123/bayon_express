import { Router } from "express";
import * as productController from "../controllers";
import { authenticate } from "@web/base/auth";
import { storeProductValidator, updateProductValidator } from "../validations";
import { validateRequest } from "@web/base/validateRequest";


const router: Router = Router();

router.get("/", authenticate,productController.index);
router.get("/:id", authenticate, productController.show);
router.post(
  "/",
  authenticate,
  storeProductValidator,
  validateRequest,
  productController.store
);
router.put(
  "/",
  authenticate,
  updateProductValidator,
  validateRequest,
  productController.update
);
router.delete("/:id", authenticate, productController.destroy);


export default router;
