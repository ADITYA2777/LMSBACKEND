import { configureStore } from "@reduxjs/toolkit";

import authSlicesReducer from "./Slices/AuthSlices.js";
import coursesSlicesReducer from "./Slices/coursesSlices.js";
import LetctureSliceReducer from "./Slices/LetctureSlice.js";
import RazorpaySlicesReducer from "./Slices/RazorpaySlices.js";
const store = configureStore({
  reducer: {
    auth: authSlicesReducer,
    courses: coursesSlicesReducer,
    razorpay: RazorpaySlicesReducer,
    lecture: LetctureSliceReducer,
  },
  devTools: true,
});

export default store;
