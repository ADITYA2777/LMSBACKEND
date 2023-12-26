// import { json } from "express";
import { json } from "express";
import User from "../models/user.model.js";
import AppError from "../utils/error.utls.js";
import fs from "fs/promises";

const cookiesOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, //14 days
  httpOnly: true,
  secure: true,
};

const resgister = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("ALL FILED ARE REQUIRED", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("EMAIL IS ALREADY EXISTS", 400));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: email,
      secure_url:
        "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
    },
  });

  if (!user) {
    return next(
      new AppError("User registration failed, please try again later", 400)
    );
  }

  //Todo: Files  upload
console.log("Files Details >", JSON.stringify(req.file));
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.uploade(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (result) {
        user.avatar.public_id = user.result.public_id;
        user.avatar.secure_url = user.result.secure_url;

        // Remove files  from server

        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (e) {
      return next(
        new AppError(error || "Files not uploaded. Please try again!", 500)
      );
    }
  }

  await user.save();

  user.password = undefined;

  const token = await user.generateJWTTOKEN();

  res.cookie("token", token, cookiesOptions);

  res.status(201).json({
    success: true,
    message: "USER REGISTER  SUCCESSFULLY",
    user,
  });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("ALL FIELDS ARE REQUIRED", 400));
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("EMAI OR PASSWORD DOES  NOT MATCH", 400));
    }

    const token = await user.generateJWTTOKEN();
    user.password = undefined;

    res.cookie("token", token, cookiesOptions);

    res.status(200).json({
      success: true,
      message: "USER SUCCESSFULLY LOGGED !!",
      user,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "USER LOGOUT SUCCESSFULLY",
  });
};
const getProflies = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (e) {
    return next(new AppError("FAILED TO FETCH PROFILE"));
  }
};

const forgotPassword = async(req,res) => {
  
  const { email } = req.body;

  if (!email) {
    return next (new AppError('Email is required',400))
  }

  const user = await User.findOne({ email })
  if (!user) {
    return next(new AppError("Email is not registered", 400));
  }

  const restToken = await user.generatePasswordRestToken()
  
}
const resetPassword = () => {
  
}

const comin = () => {
  
}

export { resgister, login, logout, getProflies,forgotPassword,resetPassword };
