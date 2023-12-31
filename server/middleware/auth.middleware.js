import AppError from "../utils/AppError.js";

import jwt from 'jsonwebtoken';


export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new AppError("Unauthenticated,please login", 400));
  }

  const userDetalis = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetalis;

  next();
};

export const authorizeRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRoles = req.user.role;

    if (!roles.includes(currentUserRoles)) {
      return next(
        new AppError("You dont have a premission to access this route ")
      );
    }
    next();
  };

export const authorizeSubscribers = async (req, res, next) => {
  const subscription = req.user.subscription;
  const currentUserRoles = req.user.role;
  if (currentUserRoles !== "ADMIN" && subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }
  next();
};