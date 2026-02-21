import { Router } from "express";
import { getUserValidator, loginValidator, signUpValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.js";
import { getUser, login, signup } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signUpValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get('/get-user', authMiddleware, getUserValidator, validate, getUser);

export default router;