

import { Router } from "express";
import { createCourses, getAllCourses, getLecturesByCoursesId, removesCourses, updatesCourses } from "../controllers/course.controller.js";
import { isLogged } from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(upload.single("thumbnail"), createCourses);
router.route('/:id')
    .get(isLogged, getLecturesByCoursesId)
    .put(updatesCourses)
    .delete(removesCourses);

export default router;