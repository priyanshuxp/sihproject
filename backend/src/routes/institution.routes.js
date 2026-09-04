import { Router } from "express";
import { authenticate, requireInstitutionPermission, requireInstitutionMember } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as institutionController from "../controllers/institution.controller.js";
import * as roleController from "../controllers/institutionRole.controller.js";
import * as memberController from "../controllers/institutionMember.controller.js";

import { createInstitutionSchema, updateInstitutionSchema } from "../validators/institution.validator.js";
import { createRoleSchema, updateRoleSchema, updateRolePermissionsSchema } from "../validators/role.validator.js";
import { approveMemberSchema, updateMemberRoleSchema } from "../validators/member.validator.js";

const router = Router();

// =========================================================================
// Institution Core Routes
// =========================================================================
router.post(
  "/",
  authenticate,
  validate(createInstitutionSchema),
  institutionController.createInstitution
);

router.get(
  "/:institutionId",
  authenticate,
  institutionController.getInstitution
);

router.put(
  "/:institutionId",
  authenticate,
  requireInstitutionPermission("INSTITUTION_UPDATE"),
  validate(updateInstitutionSchema),
  institutionController.updateInstitution
);

router.post(
  "/:institutionId/join",
  authenticate,
  institutionController.joinInstitution
);

// =========================================================================
// Institution Role Routes
// =========================================================================
router.get(
  "/:institutionId/roles",
  authenticate,
  requireInstitutionPermission("ROLE_VIEW"),
  roleController.listRoles
);

router.post(
  "/:institutionId/roles",
  authenticate,
  requireInstitutionPermission("ROLE_CREATE"),
  validate(createRoleSchema),
  roleController.createRole
);

router.get(
  "/:institutionId/roles/:roleId",
  authenticate,
  requireInstitutionPermission("ROLE_VIEW"),
  roleController.getRole
);

router.put(
  "/:institutionId/roles/:roleId",
  authenticate,
  requireInstitutionPermission("ROLE_UPDATE"),
  validate(updateRoleSchema),
  roleController.updateRole
);

router.delete(
  "/:institutionId/roles/:roleId",
  authenticate,
  requireInstitutionPermission("ROLE_DELETE"),
  roleController.deleteRole
);

// =========================================================================
// Institution Role Permission Routes
// =========================================================================
router.get(
  "/:institutionId/roles/:roleId/permissions",
  authenticate,
  requireInstitutionPermission("ROLE_VIEW"),
  roleController.getRolePermissions
);

router.put(
  "/:institutionId/roles/:roleId/permissions",
  authenticate,
  requireInstitutionPermission("ROLE_ASSIGN"),
  validate(updateRolePermissionsSchema),
  roleController.updateRolePermissions
);

// =========================================================================
// Institution Member Routes
// =========================================================================
router.get(
  "/:institutionId/members",
  authenticate,
  requireInstitutionPermission("MEMBER_VIEW"),
  memberController.listMembers
);

router.get(
  "/:institutionId/members/pending",
  authenticate,
  requireInstitutionPermission("MEMBER_APPROVE"),
  memberController.listPendingMembers
);

router.post(
  "/:institutionId/members/:memberId/approve",
  authenticate,
  requireInstitutionPermission("MEMBER_APPROVE"),
  validate(approveMemberSchema),
  memberController.approveMember
);

router.post(
  "/:institutionId/members/:memberId/reject",
  authenticate,
  requireInstitutionPermission("MEMBER_APPROVE"),
  memberController.rejectMember
);

router.put(
  "/:institutionId/members/:memberId/role",
  authenticate,
  requireInstitutionPermission("ROLE_ASSIGN"),
  validate(updateMemberRoleSchema),
  memberController.updateMemberRole
);

router.delete(
  "/:institutionId/members/:memberId",
  authenticate,
  requireInstitutionPermission("MEMBER_REMOVE"),
  memberController.removeMember
);

export default router;
