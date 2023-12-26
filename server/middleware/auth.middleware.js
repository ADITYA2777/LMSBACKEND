import AppError from "../utils/error.utls.js";

import jwt from 'jsonwebtoken';


export const isLogged = async (req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new AppError("Unauthenticated,please login", 400))
    }

    const userDetalis = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetalis;

    next();

}