import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as organizationRoleService from "../services/organizationRole.service.js";

/**
 * List all roles for organization
 * GET /api/organizations/:organizationId/roles
 */
export const listRoles = asyncHandler(async (req, res) => {
  const roles = await organizationRoleService.listRoles(req.params.organizationId);
  return res
    .status(200)
    .json(new ApiResponse(200, roles, "Organization roles fetched successfully."));
});

/**
 * Create a new custom role for organization
 * POST /api/organizations/:organizationId/roles
 */
export const createRole = asyncHandler(async (req, res) => {
  const role = await organizationRoleService.createRole(req.params.organizationId, req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, role, "Organization role created successfully."));
});

/**
 * Get role details by ID
 * GET /api/organizations/:organizationId/roles/:roleId
 */
export const getRole = asyncHandler(async (req, res) => {
  const role = await organizationRoleService.getRoleById(
    req.params.organizationId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role fetched successfully."));
});

/**
 * Update role
 * PUT /api/organizations/:organizationId/roles/:roleId
 */
export const updateRole = asyncHandler(async (req, res) => {
  const role = await organizationRoleService.updateRole(
    req.params.organizationId,
    req.params.roleId,
    req.body
  );
  return res
    .status(200)
    .json(new ApiResponse(200, role, "Role updated successfully."));
});

/**
 * Delete role
 * DELETE /api/organizations/:organizationId/roles/:roleId
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const result = await organizationRoleService.deleteRole(
    req.params.organizationId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Role deleted successfully."));
});

/**
 * Get role permissions
 * GET /api/organizations/:organizationId/roles/:roleId/permissions
 */
export const getRolePermissions = asyncHandler(async (req, res) => {
  const permissions = await organizationRoleService.getRolePermissions(
    req.params.organizationId,
    req.params.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, permissions, "Role permissions fetched successfully."));
});

/**
 * Assign/update permissions for role
 * PUT /api/organizations/:organizationId/roles/:roleId/permissions
 */
export const updateRolePermissions = asyncHandler(async (req, res) => {
  const updatedRole = await organizationRoleService.updateRolePermissions(
    req.params.organizationId,
    req.params.roleId,
    req.body.permissions
  );
  return res
    .status(200)
    .json(new ApiResponse(200, updatedRole, "Role permissions updated successfully."));
});
