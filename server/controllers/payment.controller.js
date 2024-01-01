import AppError from "../utils/error.utls.js";
import User from "../models/user.model.js";
import { razorpay } from "../server.js";
import crypto from "crypto";

export const getRazorpayApiKey = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razarpay Api key ",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (e) {
    next(new AppError("e.message", 500));
  }
};
export const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized,Please login"));
    }

    if (user.role === "ADMIN") {
      return next(new AppError("Admin cannot puraches a subscription ", 400));
    }

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscribed Successfully",
      subscription_id: subscription.id,
    });
  } catch (e) {
    next(new AppError("e.message", 500));
  }
};
export const verifySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    } = req.body;

    // Finding the user
    const user = await User.findById(id);

    // Getting the subscription ID from the user object
    const subscriptionId = user.subscription.id;

    // Generating a signature with SHA256 for verification purposes
    // Here the subscriptionId should be the one which we saved in the DB
    // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
    // At the end convert it to Hex value
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_payment_id}|${subscriptionId}`)
      .digest("hex");

    // Check if generated signature and signature received from the frontend is the same or not
    if (generatedSignature !== razorpay_signature) {
      return next(new AppError("Payment not verified, please try again.", 400));
    }

    // If they match create payment and store it in the DB
    await Payment.create({
      razorpay_payment_id,
      razorpay_subscription_id,
      razorpay_signature,
    });

    // Update the user subscription status to active (This will be created before this)
    user.subscription.status = "active";

    // Save the user in the DB with any changes
    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (e) {
    next(new AppError("e.message", 500));
  }
};

export const cancelSubscription = async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  // Checking the user role
  if (user.role === "ADMIN") {
    return next(
      new AppError("Admin does not need to cannot cancel subscription", 400)
    );
  }

  // Finding subscription ID from subscription
  const subscriptionId = user.subscription.id;

  // Creating a subscription using razorpay that we imported from the server
  try {
    const subscription = await razorpay.subscriptions.cancel(
      subscriptionId // subscription id
    );

    // Adding the subscription status to the user account
    user.subscription.status = subscription.status;

    // Saving the user object
    await user.save();
  } catch (error) {
    // Returning error if any, and this error is from razorpay so we have statusCode and message built in
    return next(new AppError(error.error.description, error.statusCode));
  }
};
export const allPayments = async (req, res, next) => {
    try {
        const { count ,skip} = req.query;
        const subscription = await razorpay.subscriptions.all({
          count: count ? count : 10, // If count is sent then use that else default to 10
          skip: skip ? skip : 0,
        });
        res.status(200).json({
            success: true,
            message: "ALL Payment",
            subscription
        })
    } catch (e) {
        next(
            new AppError("e.message",500)
        )
    }
};
