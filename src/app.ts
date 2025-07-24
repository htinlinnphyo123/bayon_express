import express, { Express } from "express";
import { ddMiddleware } from "../middleware/ddMiddleware"
import responseHelper from "../utils/response-helper";

const app: Express = express();
app.disable('x-powered-by');
app.use(responseHelper);
app.use(ddMiddleware);
app.use(express.json());

// Use product routes with a base path
import mobileRoutes from "../routes/mobileApi";
import spaApi from "../routes/spaApi";
import webApi from "../routes/webApi";
import swagger from "../swagger/config";

app.use(swagger);

app.use("/api/mobile", mobileRoutes);
app.use("/api/spa",spaApi)
app.use("/api/web",webApi);

export default app;
