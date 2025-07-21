import { body, ValidationChain } from "express-validator";

export const loginAuthValidator: ValidationChain[] = [
  body("email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

export const registerAuthValidator: ValidationChain[] = [
  body("email")
    .notEmpty()
    .withMessage("Email is required"),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];
