import express, { Express } from "express";
import { ddMiddleware } from "../middleware/ddMiddleware"

const app: Express = express();
app.use(ddMiddleware);
app.use(express.json());

// Use product routes with a base path
import mobileRoutes from "../routes/mobileApi";
import spaApi from "../routes/spaApi";
import webApi from "../routes/webApi";

//Mobile
app.use("/api/mobile", mobileRoutes);
//Spa
//app.use("/api/spa",spaApi)
//Web
app.use("/api/web",webApi);


export default app;
