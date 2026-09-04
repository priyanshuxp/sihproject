import { Router } from "express";
import { authenticate, requireOrganizationPermission, requireOrganizationMember } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import * as organizationController from "../controllers/organization.controller.js";
import * as roleController from "../controllers/organizationRole.controller.js";
import * as memberController from "../controllers/organizationMember.controller.js";

import { createOrganizationSchema, updateOrganizationSchema } from "../validators/organization.validator.js";
import { createRoleSchema, updateRoleSchema, updateRolePermissionsSchema } from "../validators/role.validator.js";
import { joinOrganizationSchema, approveMemberSchema, updateMemberRoleSchema } from "../validators/member.validator.js";

const router = Router();

// =========================================================================
// Organization Core Routes
// =========================================================================
router.post(
  "/",
  authenticate,
  validate(createOrganizationSchema),
  organizationController.createOrganization
);

router.get(
  "/:organizationId",
  authenticate,
  organizationController.getOrganization
);

router.put(
  "/:organizationId",
  authenticate,
  requireOrganizationPermission("ORGANIZATION_UPDATE"),
  validate(updateOrganizationSchema),
  organizationController.updateOrganization
);

router.post(
  "/:organizationId/join",
  authenticate,
  validate(joinOrganizationSchema),
  organizationController.joinOrganization
);

// =========================================================================
// Organization Role Routes
// =========================================================================
router.get(
  "/:organizationId/roles",
  authenticate,
  requireOrganizationPermission("ROLE_VIEW"),
  roleController.listRoles
);

router.post(
  "/:organizationId/roles",
  authenticate,
  requireOrganizationPermission("ROLE_CREATE"),
  validate(createRoleSchema),
  roleController.createRole
);

router.get(
  "/:organizationId/roles/:roleId",
  authenticate,
  requireOrganizationPermission("ROLE_VIEW"),
  roleController.getRole
);

router.put(
  "/:organizationId/roles/:roleId",
  authenticate,
  requireOrganizationPermission("ROLE_UPDATE"),
  validate(updateRoleSchema),
  roleController.updateRole
);

router.delete(
  "/:organizationId/roles/:roleId",
  authenticate,
  requireOrganizationPermission("ROLE_DELETE"),
  roleController.deleteRole
);

// =========================================================================
// Organization Role Permission Routes
// =========================================================================
router.get(
  "/:organizationId/roles/:roleId/permissions",
  authenticate,
  requireOrganizationPermission("ROLE_VIEW"),
  roleController.getRolePermissions
);

router.put(
  "/:organizationId/roles/:roleId/permissions",
  authenticate,
  requireOrganizationPermission("ROLE_ASSIGN"),
  validate(updateRolePermissionsSchema),
  roleController.updateRolePermissions
);

// =========================================================================
// Organization Member Routes
// =========================================================================
router.get(
  "/:organizationId/members",
  authenticate,
  requireOrganizationPermission("MEMBER_VIEW"),
  memberController.listMembers
);

router.get(
  "/:organizationId/members/pending",
  authenticate,
  requireOrganizationPermission("MEMBER_APPROVE"),
  memberController.listPendingMembers
);

router.post(
  "/:organizationId/members/:memberId/approve",
  authenticate,
  requireOrganizationPermission("MEMBER_APPROVE"),
  validate(approveMemberSchema),
  memberController.approveMember
);

router.post(
  "/:organizationId/members/:memberId/reject",
  authenticate,
  requireOrganizationPermission("MEMBER_APPROVE"),
  memberController.rejectMember
);

router.put(
  "/:organizationId/members/:memberId/role",
  authenticate,
  requireOrganizationPermission("ROLE_ASSIGN"),
  validate(updateMemberRoleSchema),
  memberController.updateMemberRole
);

router.delete(
  "/:organizationId/members/:memberId",
  authenticate,
  requireOrganizationPermission("MEMBER_REMOVE"),
  memberController.removeMember
);

export default router;
