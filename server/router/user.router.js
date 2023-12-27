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
import { isLogged } from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();

router.post("/register",upload.single("avatar"),resgister);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLogged, getProflies);
router.post("/reset",forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change-password", isLogged,changePassword);
router.put("/update", isLogged,upload.single("avatar"),updatesUser);

export default router;
