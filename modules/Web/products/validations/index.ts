import { body, ValidationChain } from "express-validator";

export const storeProductValidator: ValidationChain[] = [
  body("categoryId")
    .isInt()
    .withMessage("Category ID must be an integer"),
  body("name")
    .notEmpty()
    .withMessage("Name is required"),
  body("description")
    .notEmpty()
    .withMessage("Description is required"),
  body("imageUrls")
    .notEmpty()
    .withMessage("Image is required"),
  
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
  body("imageUrls")
    .notEmpty()
    .withMessage("Image is required"),
];
