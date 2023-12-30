import { Router } from "express";
import {
  getRazorpayApiKey,
  buySubscription,
  verifySubscription,
  cancelSubscription,
  allPayments,
} from "../controllers/payment.controller.js";
import { authorizedRoles, isLogged } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/subscribe").post(isLogged, buySubscription);
router.route("/verify").post(isLogged, verifySubscription);
router.route("/unsubscribe").post(isLogged, cancelSubscription);
router.route("/razorpay-key").get(isLogged, getRazorpayApiKey);
router.route("/").get(isLogged,authorizedRoles, allPayments);

export default router;
