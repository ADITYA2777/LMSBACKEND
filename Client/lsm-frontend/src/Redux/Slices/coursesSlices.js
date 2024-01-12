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
export const createNewCourses = createAsyncThunk(
  "/course/create",
  async (data) => {
    try {
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const response = await axiosInstance.post("/courses", formData);

      // The toast promise should only be awaited if you need to wait for it to complete.
      // In this case, it might not be necessary, and you can remove it if it causes issues.
      // If you do await it, make sure to use `await toast.promise` directly.

      toast.success("Course created successfully");

      return response.data;
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to create course");
      throw error;
    }
  }
);


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
