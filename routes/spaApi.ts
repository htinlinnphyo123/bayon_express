import express,{Router} from "express"
import productRoutes from "@spa/products/routes/index"
const spaRoutes: Router = express.Router();

spaRoutes.use("/products", productRoutes);

export default spaRoutes;
