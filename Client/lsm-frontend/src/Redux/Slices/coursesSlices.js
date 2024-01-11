import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axoisinstance";

const initialState = {
  coursesData: [],
};
export const getAllCourses = createAsyncThunk("/courses/get", async () => {
  try {
    const response = await axiosInstance.get("/courses");
    console.log("res info:", response);
    toast.promise(Promise.resolve(response), {
      success: "Courses loaded successfully.",
    });
    return response?.data?.courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

const coursesSlices = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCourses.fulfilled, (state, action) => {
      if (action.payload) {
        state.coursesData = [...action.payload];
        console.log("courses", action.payload);
      }
    });
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getAllCourses.fulfilled, (state, action) => {
  //     console.log("Payload:", action.payload);
  //     if (action.payload && Array.isArray(action.payload)) {
  //       state.coursesData = [...action.payload];
  //       console.log("courses", action.payload);
  //     }
  //   });
  // },
});

export default coursesSlices.reducer;
