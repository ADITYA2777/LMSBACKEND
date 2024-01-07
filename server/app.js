import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import userRouter from './router/user.router.js'
import errorMiddleware from "./middleware/error.middleware.js";
import courseRouter from "./router/course.router.js";
import  paymentRouter from "./router/payment.router.js"
config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));

app.use("/ping", (req, res) => {
  res.send("pong");
});

app.use('/api/v1/user/',userRouter)
app.use("/api/v1/courses",courseRouter);
app.use("/api/v1/payment",paymentRouter);

app.all("*", (req, res) => {
  res.status(404).send("OOPS !! 404 page is not found");
});
app.use(errorMiddleware)

export default app;
