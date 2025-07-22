import express, { Router } from "express";

const mobileRoutes: Router = express.Router();

mobileRoutes.get('/iammobile', (req, res) => {
  res.send('Mobile API');
})

mobileRoutes.get('/iammobiletwo', (req, res) => {
  res.send('Mobile API 2');
})
export default mobileRoutes;
