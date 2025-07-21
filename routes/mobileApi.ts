import express, { Router } from "express";
import productRoutes from "@mobile/products/routes/index";

const mobileRoutes: Router = express.Router();

mobileRoutes.use("/products", productRoutes);

export default mobileRoutes;
