import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helper/axoisinstance";

const initialState = {
  coursesData: [],
};

export const getAllCourses = createAsyncThunk("/course/get", async () => {
  try {
    const response = axiosInstance.get("/courses");
    toast.promise(response, {
      loading:"loading courses  data .....",
      success:"Courese loaded successfully..",
      error: "Failed to get the courses",
    });
      return (await response).data.courses;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const coursesSlices = createSlice({
  name: "courses",
  initialState,
  reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state,action) => {
            if (action.payload) {
              console.log( "courses",action.payload);
            state.coursesData = [...action.payload]
          }
      })
  },
});

export default coursesSlices.reducer;
