import Joi from "joi";

export const createInstitutionSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).required().messages({
    "string.empty": "Institution name is required",
    "any.required": "Institution name is required",
  }),
  description: Joi.string().trim().allow("", null).optional(),
  website: Joi.string().trim().uri().allow("", null).optional(),
  logo: Joi.string().trim().uri().allow("", null).optional(),
  email: Joi.string().trim().email().allow("", null).optional(),
  phone: Joi.string().trim().allow("", null).optional(),
  address: Joi.string().trim().allow("", null).optional(),
  city: Joi.string().trim().allow("", null).optional(),
  state: Joi.string().trim().allow("", null).optional(),
  country: Joi.string().trim().allow("", null).optional(),
});

export const updateInstitutionSchema = Joi.object({
  name: Joi.string().trim().min(2).max(255).optional(),
  description: Joi.string().trim().allow("", null).optional(),
  website: Joi.string().trim().uri().allow("", null).optional(),
  logo: Joi.string().trim().uri().allow("", null).optional(),
  email: Joi.string().trim().email().allow("", null).optional(),
  phone: Joi.string().trim().allow("", null).optional(),
  address: Joi.string().trim().allow("", null).optional(),
  city: Joi.string().trim().allow("", null).optional(),
  state: Joi.string().trim().allow("", null).optional(),
  country: Joi.string().trim().allow("", null).optional(),
  status: Joi.string().valid("ACTIVE", "INACTIVE", "SUSPENDED").optional(),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});
