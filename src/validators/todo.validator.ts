import { body, param } from "express-validator";

export const createTodoValidator = [
  body("title").notEmpty().withMessage("Title is required"),
];

export const updateTodoValidator = [
  param("id").isMongoId().withMessage("Invalid todo id"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
];

export const todoIdValidator = [
  param("id").isMongoId().withMessage("Invalid todo id"),
];
