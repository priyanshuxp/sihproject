import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as profileController from "../controllers/profile.controller.js";
import { studentProfileSchema, academicianProfileSchema } from "../validators/profile.validator.js";

const router = Router();

// Student Profile
router.get("/student", authenticate, profileController.getStudentProfile);
router.post(
  "/student",
  authenticate,
  validate(studentProfileSchema),
  profileController.upsertStudentProfile
);
router.put(
  "/student",
  authenticate,
  validate(studentProfileSchema),
  profileController.upsertStudentProfile
);

// Academician Profile
router.get("/academician", authenticate, profileController.getAcademicianProfile);
router.post(
  "/academician",
  authenticate,
  validate(academicianProfileSchema),
  profileController.upsertAcademicianProfile
);
router.put(
  "/academician",
  authenticate,
  validate(academicianProfileSchema),
  profileController.upsertAcademicianProfile
);

export default router;
