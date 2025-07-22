import express, { Router } from "express";

const mobileRoutes: Router = express.Router();

mobileRoutes.get('/iammobile', (req, res) => {
  res.successResponse({
    message: 'Mobile API',
  })
})

mobileRoutes.get('/iammobiletwo', (req, res) => {
  res.successResponse('Mobile API 2')
})
export default mobileRoutes;
