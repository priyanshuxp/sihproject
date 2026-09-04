import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as organizationMemberService from "../services/organizationMember.service.js";

/**
 * List active members of organization
 * GET /api/organizations/:organizationId/members
 */
export const listMembers = asyncHandler(async (req, res) => {
  const members = await organizationMemberService.listMembers(req.params.organizationId);
  return res
    .status(200)
    .json(new ApiResponse(200, members, "Organization members fetched successfully."));
});

/**
 * List pending join requests
 * GET /api/organizations/:organizationId/members/pending
 */
export const listPendingMembers = asyncHandler(async (req, res) => {
  const pending = await organizationMemberService.listPendingMembers(req.params.organizationId);
  return res
    .status(200)
    .json(new ApiResponse(200, pending, "Pending employee requests fetched successfully."));
});

/**
 * Approve a pending employee join request
 * POST /api/organizations/:organizationId/members/:memberId/approve
 */
export const approveMember = asyncHandler(async (req, res) => {
  const member = await organizationMemberService.approveMember(
    req.params.organizationId,
    req.params.memberId,
    req.user.user_uuid,
    req.body.roleId || null
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Employee approved successfully."));
});

/**
 * Reject a pending employee join request
 * POST /api/organizations/:organizationId/members/:memberId/reject
 */
export const rejectMember = asyncHandler(async (req, res) => {
  const member = await organizationMemberService.rejectMember(
    req.params.organizationId,
    req.params.memberId,
    req.user.user_uuid
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Employee request rejected."));
});

/**
 * Assign or update an employee's role
 * PUT /api/organizations/:organizationId/members/:memberId/role
 */
export const updateMemberRole = asyncHandler(async (req, res) => {
  const member = await organizationMemberService.updateMemberRole(
    req.params.organizationId,
    req.params.memberId,
    req.body.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Employee role updated successfully."));
});

/**
 * Remove a member from the organization
 * DELETE /api/organizations/:organizationId/members/:memberId
 */
export const removeMember = asyncHandler(async (req, res) => {
  const result = await organizationMemberService.removeMember(
    req.params.organizationId,
    req.params.memberId,
    req.user.user_uuid
  );
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Employee removed successfully."));
});
