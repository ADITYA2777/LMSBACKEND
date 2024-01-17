// import AppError from "../utils/AppError.js";

// import jwt from 'jsonwebtoken';

// export const isLoggedIn = async (req, res, next) => {
//   const { token } = req.cookies;
//   if (!token) {
//     return next(new AppError("Unauthenticated,please login", 400));
//   }

//   const userDetalis = await jwt.verify(token, process.env.JWT_SECRET);
//   req.user = userDetalis;

//   next();
// };

// export const authorizeRoles =
//   (...roles) =>
//   async (req, res, next) => {
//     const currentUserRoles = req.user.role;

//     if (!roles.includes(currentUserRoles)) {
//       return next(
//         new AppError("You dont have a premission to access this route ")
//       );
//     }
//     next();
//   };

// export const authorizeSubscribers = async (req, res, next) => {
//   const subscription = req.user.subscription;
//   const currentUserRoles = req.user.role;

//   if (currentUserRoles !== "ADMIN"  &&  user.subscription.status !== "active") {
//     return next(new AppError("Please subscribe to access this route.", 403));
//   }
//   next();
// };

import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import asyncHandler from "./async.Handler.js";
import User from "../models/user.model.js";
// import asyncHandler from "./asyncHandler.middleware.js";

export const isLoggedIn = asyncHandler(async (req, _res, next) => {
  // extracting token from the cookies
  const { token } = req.cookies;

  // If no token send unauthorized message
  if (!token) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // Decoding the token using jwt package verify method
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // If no decode send the message unauthorized
  if (!decoded) {
    return next(new AppError("Unauthorized, please login to continue", 401));
  }

  // If all good store the id in req object, here we are modifying the request object and adding a custom field user in it
  req.user = decoded;

  // Do not forget to call the next other wise the flow of execution will not be passed further
  next();
});

// Middleware to check if user is admin or not
export const authorizeRoles = (...roles) =>
  asyncHandler(async (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to view this route", 403)
      );
    }

    next();
  });

// Middleware to check if user has an active subscription or not
export const authorizeSubscribers = asyncHandler(async (req, _res, next) => {
  // If user is not admin or does not have an active subscription then error else pass
  const user = User.findById(req.user.id)
  console.log(user);
  if (user.role !== "ADMIN" && user.subscription.status !== "active") {
    return next(new AppError("Please subscribe to access this route.", 403));
  }

  next();
});
