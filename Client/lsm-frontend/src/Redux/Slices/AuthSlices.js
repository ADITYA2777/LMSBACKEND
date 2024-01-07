import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axoisinstance";

// const initialState = {
//   isLoggedIn: localStorage.getItem("isLoggedIn") || false,
//   role: localStorage.getItem("role") || "",
//   data: localStorage.getItem("data") || {},
// };

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Convert to boolean
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : {},
};


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    let res = axiosInstance.post("user/register", data);

    toast.promise(res, {
      loading: "Wait! Creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create account",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    let res = axiosInstance.post("user/login", data);

    toast.promise(res, {
      loading: "Wait! authentication in  progress..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to log in ..",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    let res = axiosInstance.post("user/logout");

    toast.promise(res, {
      loading: "Wait! Logout in  progress..",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to logout in ..",
    });

    // getting response resolved here
    res = await res;
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("data", JSON.stringify(action?.payload?.user));
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("role", action?.payload?.user?.role);
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
    })
  },
});

// const {} = authSlices.actions
export default authSlices.reducer;

