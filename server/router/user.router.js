import { Router } from "express";
import {
  forgotPassword,
  getProflies,
  login,
  logout,
  resetPassword,
  resgister,
} from "../controllers/user.controller.js";
import { isLogged } from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), resgister);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLogged, getProflies);
router.get("/forgot-password",forgotPassword);
router.get("/reset-password",resetPassword);

export default router;
