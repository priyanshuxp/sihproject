import Joi from "joi";

export const joinInstitutionSchema = Joi.object({});

export const joinOrganizationSchema = Joi.object({
  jobTitle: Joi.string().trim().allow("", null).optional(),
});

export const updateMemberRoleSchema = Joi.object({
  roleId: Joi.string().uuid().allow(null).required().messages({
    "any.required": "roleId is required (or null to unassign role)",
  }),
});

export const approveMemberSchema = Joi.object({
  roleId: Joi.string().uuid().allow(null).optional(),
});
