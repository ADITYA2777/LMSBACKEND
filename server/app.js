import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";
import UserRouter from './router/user.router.js'
import errorMiddleware from "./middleware/error.middleware.js";
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

app.use('/api/v1/user/',UserRouter)

app.all("*", (req, res) => {
  res.status(404).send("OOPS !! 404 page is not found");
});
app.use(errorMiddleware)

export default app;
