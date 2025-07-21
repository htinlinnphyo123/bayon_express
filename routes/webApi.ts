import express,{Router} from "express"
import productRoutes from "@web/products/routes/index"
import authRoutes from "@web/auth/routes/index"
import presignedRoutes from "@web/presgined/routes/index"

const webRoutes: Router = express.Router();

webRoutes.use("/products", productRoutes);
webRoutes.use("/auth", authRoutes);
webRoutes.use("/get-presigned-urls",presignedRoutes);

export default webRoutes;
