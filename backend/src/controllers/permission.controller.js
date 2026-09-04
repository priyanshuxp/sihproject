import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as permissionService from "../services/permission.service.js";

/**
 * List all available global permissions
 * GET /api/permissions
 */
export const listPermissions = asyncHandler(async (req, res) => {
  const permissions = await permissionService.listPermissions();
  return res
    .status(200)
    .json(new ApiResponse(200, permissions, "Platform permissions fetched successfully."));
});
