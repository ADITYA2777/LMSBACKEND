

import { Router } from "express";
import { addLecturesToCoursesById, createCourses, getAllCourses, getLecturesByCoursesId, removesCourses, updatesCourses } from "../controllers/course.controller.js";
import { authorizedRoles, isLogged } from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(isLogged,
    authorizedRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourses);
router
  .route("/:id")
  .get(isLogged, getLecturesByCoursesId)
  .put(isLogged, authorizedRoles("ADMIN"), updatesCourses)
  .delete(isLogged, authorizedRoles("ADMIN"), removesCourses)
  .post(
    isLogged,
    authorizedRoles("ADMIN"),
    upload.single("lecture"),
    addLecturesToCoursesById
  );
export default router;