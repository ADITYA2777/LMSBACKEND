import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axoisinstance.js";

const initialState = {
  key: "",
  subscription_id: "",
  isPaymentVerified: false,
  allPayments: {},
  finalMonths: {},
  monthlySalesRecord: [],
};

export const getRazorPayId = createAsyncThunk("razorpay/getId", async () => {
  try {
    const response = await axiosInstance.get("/payment/razorpay-key");
    return response?.data;
  } catch (error) {
    toast.error("Failed to load data");
    console.log("error", error);
    throw error; // Make sure to rethrow the error after displaying the toast
  }
});

export const purchaseCourseBundle = createAsyncThunk(
  "razorpay/purchaseCourse",
  async () => {
    try {
      const response = await axiosInstance.post("/payment/subscribe");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error; // Make sure to rethrow the error after displaying the toast
    }
  }
);

export const verifyUserPayment = createAsyncThunk(
  "/payment/verify",
  async (data) => {
    try {
      const response = await axiosInstance.post("/payment/verify", {
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_subscription_id: data.razorpay_subscription_id,
        razorpay_signature: data.razorpay_signature,
      });
      console.log("res", response);
      return response.data;
    } catch (error) {
      console.log("err", error);
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getPaymentRecord = createAsyncThunk(
  "/payment/record",
  async () => {
    try {
      const response = axiosInstance.get("/payment?count=100");
      toast.promise(response, {
        loading: "Getting the payment records",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to get payment records",
      });
      return await response.data;
    } catch (error) {
      toast.error("Operation failed");
    }
  }
);

export const cancelCourseBundle = createAsyncThunk(
  "/payment/cancel",
  async () => {
    try {
      const response = axiosInstance.post("/payment/unsubscribe");
      toast.promise(response, {
        loading: "unsubscribing the bundle",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to ubsubscribe",
      });
      return await response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRazorPayId.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(purchaseCourseBundle.fulfilled, (state, action) => {
        state.subscription_id = action?.payload?.subscription_id;
      })
      .addCase(verifyUserPayment.fulfilled, (state, action) => {
        console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(verifyUserPayment.rejected, (state, action) => {
        console.log(action);
        toast.success(action?.payload?.message);
        state.isPaymentVerified = action?.payload?.success;
      })
      .addCase(getPaymentRecord.fulfilled, (state, action) => {
        state.allPayments = action?.payload?.allPayments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord = action?.payload?.monthlySalesRecord;
      });
  },
});

export default razorpaySlice.reducer;
