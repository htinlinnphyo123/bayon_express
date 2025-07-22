import { Router } from "express";

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const route = Router();
route.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default route;