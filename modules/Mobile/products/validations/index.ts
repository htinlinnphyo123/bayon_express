import { body, ValidationChain } from "express-validator";

export const createProductValidator: ValidationChain[] = [
  body("categoryId")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
];

export const updateProductValidator: ValidationChain[] = [
  body("id")
    .isInt()
    .withMessage("Main id must be an integer"),
  body("categoryId")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
];
