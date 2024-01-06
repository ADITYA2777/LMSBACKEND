import Course from "../models/course.model.js";
import AppError from "../utils/AppError.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";

const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.findOne({}).select("-lectures");

    res.status(200).json({
      success: true,
      message: "ALL COURSES",
      courses,
    });
  } catch (e) {
    next(new AppError("e.message", 500));
  }
};
const getLecturesByCoursesId = async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  const course = await Course.findById(id);
  console.log(course);
  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course lectures fetched successfully",
    lectures: course.lectures,
  });
};

const createCourses = async function (req, res, next) {
  const { tittle, discription, category, createdBy } = req.body;

  if (!tittle || !discription || !!category || !createdBy) {
    return next(new AppError("All fields are required"));
  }
  const course = await Course.create({
    tittle,
    discription,
    category,
    createdBy,
    thumbnail: {
      public_id: "Dummy",
      secure_url: "Dummy",
    },
  });

  if (!course) {
    return next(new AppError("Course is not created ,please try again", 500));
  }

  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      console.log(JSON.stringify(result));
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    } catch (e) {
      return next(new AppError("e.message", 500));
    }
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Courses created successfully!!",
    course,
  });
};
const updatesCourses = async function (req, res, next) {
  try {
    // Extracting the course id from the request params
    const { id } = req.params;

    // Finding the course using the course id
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, // This will only update the fields which are present
      },
      {
        runValidators: true, // This will run the validation checks on the new data
      }
    );

    // If no course found then send the response for the same
    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 400));
    }
  } catch (e) {
    return next(new AppError("e.message", 500));
  }
  // Sending the response after success
  res.status(200).json({
    success: true,
    message: "Course updated successfully",
  });
};
const removesCourses = async function (req, res, next) {
  try {
    // Extracting id from the request parameters
    const { id } = req.params;

    // Finding the course via the course ID
    const course = await Course.findById(id);

    // If course not find send the message as stated below
    if (!course) {
      return next(new AppError("Course with given id does not exist.", 404));
    }
  } catch (e) {
    return next(new AppError("e.message", 500));
  }

  // Remove course
  await Course.remove();

  // Send the message as response
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
};

const addLecturesToCoursesById =async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.params;

  let lectureData = {};

  if (!title || !description) {
    return next(new AppError("Title and Description are required", 400));
  }

  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError("Invalid course id or course not found.", 400));
  }

  // Run only if user sends a file
  if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms", // Save files in a folder named lms
        chunk_size: 50000000, // 50 mb size
        resource_type: "video",
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in array
        lectureData.public_id = result.public_id;
        lectureData.secure_url = result.secure_url;
      }

      // After successful upload remove the file from local storage
      fs.rm(`uploads/${req.file.filename}`);
    } catch (error) {
      // Empty the uploads directory without deleting the uploads directory
      for (const file of await fs.readdir("uploads/")) {
        await fs.unlink(path.join("uploads/", file));
      }

      // Send the error message
      return next(
        new AppError(
          JSON.stringify(error) || "File not uploaded, please try again",
          400
        )
      );
    }
  }

  course.lectures.push({
    title,
    description,
    lecture: lectureData,
  });

  course.numberOfLectures = course.lectures.length;

  // Save the course object
  await course.save();

  res.status(200).json({
    success: true,
    message: "Course lecture added successfully",
    course,
  });
};

export {
  getAllCourses,
  getLecturesByCoursesId,
  createCourses,
  updatesCourses,
  removesCourses,
  addLecturesToCoursesById,
};
