import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getProflies,
  login,
  logout,
  resetPassword,
  resgister,
  updatesUser,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();
router.post("/register",upload.single("avatar"),resgister);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isLoggedIn, getProflies);
router.post("/reset",forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLoggedIn, changePassword);
router.put("/update", isLoggedIn, upload.single("avatar"), updatesUser);

export default router;
