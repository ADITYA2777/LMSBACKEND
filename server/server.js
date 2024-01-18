// import app from "./app.js";
// import connectionDB from "./config/dbConnection.js";
// import cloudinary from "cloudinary";
// import Razorpay from "razorpay";


// const PORT = process.env.PORT || 5000;

// // Cloudinary configuration
// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// app.listen(PORT, async () => {
//   await connectionDB();
//   console.log(`APP is Runinng at http://localhost:${PORT}`);
// });

import app from "./app.js";
import connectionDB from "./config/dbConnection.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import mongoose from "mongoose";

// Enable Mongoose query debugging
mongoose.set("debug", (collectionName, methodName, ...methodArgs) => {
  console.log(`${collectionName}.${methodName}(${JSON.stringify(methodArgs)})`);
});

const PORT = process.env.PORT || 5000;

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

app.listen(PORT, async () => {
  await connectionDB();
  console.log(`APP is Running at http://localhost:${PORT}`);
});

