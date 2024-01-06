import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axoisinstance"

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data") || {},
};
// resgister;

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


const authSlices = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

// const {} = authSlices.actions
export default authSlices.reducer;



// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//   try {
//     const res = await axiosInstance.post("user/register", data);
//     toast.promise(res, {
//       loading: "Wait! Creating your account",
//       success: (data) => {
//         return data?.data?.message;
//       },
//       error: "Failed to create account",
//     });
//     return res.data; // Return the data property of the response
//   } catch (error) {
//     toast.error(error?.response?.data?.message);
//     throw error; // Re-throw the error to let the rejection flow through
//   }
// });