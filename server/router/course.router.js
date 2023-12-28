

import { Router } from "express";
import { getAllCourses, getLecturesByCoursesId } from "../controllers/course.controller.js";
import { isLogged } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/').get(getAllCourses);
router.route('/:id').get( isLogged, getLecturesByCoursesId);

export default router;