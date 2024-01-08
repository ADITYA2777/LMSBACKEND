import { configureStore } from "@reduxjs/toolkit";

import authSlicesReducer from "./Slices/AuthSlices.js";
import coursesSlicesReducer from "./Slices/coursesSlices.js";
const store = configureStore({
    reducer: {
        auth: authSlicesReducer,
        courses:coursesSlicesReducer,
    },
    devTools: true,
});

export default store;