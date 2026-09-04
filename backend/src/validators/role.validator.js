import Joi from "joi";

export const createRoleSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Role name is required",
    "any.required": "Role name is required",
  }),
  description: Joi.string().trim().allow("", null).optional(),
});

export const updateRoleSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  description: Joi.string().trim().allow("", null).optional(),
}).min(1).messages({
  "object.min": "At least one field must be provided for update",
});

export const updateRolePermissionsSchema = Joi.object({
  permissions: Joi.array().items(Joi.string().trim().required()).required().messages({
    "any.required": "Permissions array is required (can be permission codes or UUIDs)",
  }),
});
