

import { Router } from "express";
import { addLecturesToCoursesById, createCourses, getAllCourses, getLecturesByCoursesId, removesCourses, updatesCourses } from "../controllers/course.controller.js";
import {
  authorizeRoles,
  authorizeSubscribers,
  isLoggedIn,
} from "../middleware/auth.middleware.js";
import upload from "../middleware/mult.middleware.js";

const router = Router();

router
  .route("/")
  .get(getAllCourses)
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    upload.single("thumbnail"),
    createCourses
  );
router
  .route("/:id")
  .get(isLoggedIn, authorizeSubscribers, getLecturesByCoursesId)
  .put(isLoggedIn, authorizeRoles("ADMIN"), updatesCourses)
  .delete(isLoggedIn, authorizeRoles("ADMIN"), removesCourses)
  .post(
    isLoggedIn,
    authorizeRoles("ADMIN"),
    upload.single("lecture"),
    addLecturesToCoursesById
  );
export default router;