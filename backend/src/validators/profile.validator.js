import Joi from "joi";

export const studentProfileSchema = Joi.object({
  bio: Joi.string().trim().allow("", null).optional(),
  course: Joi.string().trim().allow("", null).optional(),
  department: Joi.string().trim().allow("", null).optional(),
  currentYear: Joi.number().integer().min(1).max(10).allow(null).optional(),
  enrollmentNumber: Joi.string().trim().allow("", null).optional(),
  city: Joi.string().trim().allow("", null).optional(),
  state: Joi.string().trim().allow("", null).optional(),
  country: Joi.string().trim().allow("", null).optional(),
});

export const academicianProfileSchema = Joi.object({
  designation: Joi.string().trim().allow("", null).optional(),
  department: Joi.string().trim().allow("", null).optional(),
  qualification: Joi.string().trim().allow("", null).optional(),
  specialization: Joi.string().trim().allow("", null).optional(),
  experienceYears: Joi.number().integer().min(0).max(80).allow(null).optional(),
  bio: Joi.string().trim().allow("", null).optional(),
});
