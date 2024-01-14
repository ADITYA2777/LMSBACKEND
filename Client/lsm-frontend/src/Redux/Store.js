import { configureStore } from "@reduxjs/toolkit";

import authSlicesReducer from "./Slices/AuthSlices.js";
import coursesSlicesReducer from "./Slices/coursesSlices.js";
import RazorpaySlicesReducer from "./Slices/RazorpaySlices.js";
const store = configureStore({
    reducer: {
        auth: authSlicesReducer,
        courses: coursesSlicesReducer,
        razorpay:RazorpaySlicesReducer,
    },
    devTools: true,
});

export default store;