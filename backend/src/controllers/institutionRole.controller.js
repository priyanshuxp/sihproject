import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as institutionRoleService from "../services/institutionRole.service.js";

/**
 * List all roles for institution
 * GET /api/institutions/:institutionId/roles
 */
export const listRoles = asyncHandler(async (req, res) => {
  const roles = await institutionRoleService.listRoles(req.params.institutionId);
  return res
    .status(200)
    .json(new ApiResponse(200, roles, "Institution roles fetched successfully."));
});

/**
 * Create a new custom role for institution
 * POST /api/institutions/:institutionId/roles
 */
export const createRole = asyncHandler(async (req, res) => {
  const role = await institutionRoleService.createRole(req.params.institutionId, req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, role, "Institution role created successfully."));
});

/**
 * Get role details by ID
 * GET /api/institutions/:institutionId/roles/:roleId
 */
export const getRole = asyncHandler(async (req, res) => {
  const role = await institutionRoleService.getRoleById(
    req.params.institutionId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role fetched successfully."));
});

/**
 * Update role
 * PUT /api/institutions/:institutionId/roles/:roleId
 */
export const updateRole = asyncHandler(async (req, res) => {
  const role = await institutionRoleService.updateRole(
    req.params.institutionId,
    req.params.roleId,
    req.body
  );
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role updated successfully."));
});

/**
 * Delete role
 * DELETE /api/institutions/:institutionId/roles/:roleId
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const result = await institutionRoleService.deleteRole(
    req.params.institutionId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Role deleted successfully."));
});

/**
 * Get role permissions
 * GET /api/institutions/:institutionId/roles/:roleId/permissions
 */
export const getRolePermissions = asyncHandler(async (req, res) => {
  const permissions = await institutionRoleService.getRolePermissions(
    req.params.institutionId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, permissions, "Role permissions fetched successfully."));
});

/**
 * Assign/update permissions for role
 * PUT /api/institutions/:institutionId/roles/:roleId/permissions
 */
export const updateRolePermissions = asyncHandler(async (req, res) => {
  const updatedRole = await institutionRoleService.updateRolePermissions(
    req.params.institutionId,
    req.params.roleId,
    req.body.permissions
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedRole, "Role permissions updated successfully."));
});
