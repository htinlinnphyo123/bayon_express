import express,{Router} from "express"
import authRoutes from "@web/auth/routes/index"
import presignedRoutes from "@web/presgined/routes/index"
import userRoutes from "@web/users/routes/index"

const webRoutes: Router = express.Router();

webRoutes.use("/auth", authRoutes);
webRoutes.use("/get-presigned-urls",presignedRoutes);
webRoutes.use("/users",userRoutes);

export default webRoutes;
