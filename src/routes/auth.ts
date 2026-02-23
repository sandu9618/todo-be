import { Router } from "express";
import { getUserValidator, loginValidator, signUpValidator } from "../validators/auth.validator.js";
import { validate } from "../middleware/validate.js";
import { getUser, getUsers, login, signup } from "../controllers/auth.js";
import { authMiddleware, hasAccess } from "../middleware/auth.js";
import { Roles } from "../enum/role.enum.js";

const router = Router();

router.post("/signup", signUpValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get('/get-user', authMiddleware, getUserValidator, validate, getUser);
router.get('/get-users', authMiddleware, hasAccess([Roles.ADMIN]), getUsers);
export default router;