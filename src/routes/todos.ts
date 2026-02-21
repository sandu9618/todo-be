import { Router } from "express";
import {
  createTodoValidator,
  todoIdValidator,
  updateTodoValidator,
} from "../validators/todo.validator.js";
import { validate } from "../middleware/validate.js";
import { authMiddleware } from "../middleware/auth.js";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodoValidator, validate, createTodo);
router.put("/:id", authMiddleware, updateTodoValidator, validate, updateTodo);
router.delete("/:id", authMiddleware, todoIdValidator, validate, deleteTodo);

export default router;
