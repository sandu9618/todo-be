import { body } from "express-validator";

export const signUpValidator = [
  body("name")
  .notEmpty().withMessage("Name is required"),

  body("email")
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Invalid email"),

  body("password")
  .notEmpty().withMessage("Password required")
  .isLength({min:6}).withMessage("Password must be minimum 6 characters")
]

export const loginValidator = [
  body("email")
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Invalid email"),

  body("password")
  .notEmpty().withMessage("Password required")
]

export const getUserValidator = [
  body("email")
  .notEmpty().withMessage("Email is required")
  .isEmail().withMessage("Invalid email")
]