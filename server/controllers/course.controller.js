import Course from "../models/course.model.js";
import AppError from "../utils/error.utls.js";

   const getAllCourses = async function(req,res,next) {
     
       try {
           const courses = await Course.findOne({}).select("-lectures");
              
           res.status(200).json({
               success: true,
               message: "ALL COURSES",
               courses,
           });
        
       } catch (e) {
        next( new AppError("e.message",500))
       }
}
 const getLecturesByCoursesId = async function(req,res,next) {
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
}

export { getAllCourses, getLecturesByCoursesId };

