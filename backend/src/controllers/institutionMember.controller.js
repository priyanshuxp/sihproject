import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as institutionMemberService from "../services/institutionMember.service.js";

/**
 * List active members of institution
 * GET /api/institutions/:institutionId/members
 */
export const listMembers = asyncHandler(async (req, res) => {
  const members = await institutionMemberService.listMembers(req.params.institutionId);
  return res
    .status(200)
    .json(new ApiResponse(200, members, "Institution members fetched successfully."));
});

/**
 * List pending join requests
 * GET /api/institutions/:institutionId/members/pending
 */
export const listPendingMembers = asyncHandler(async (req, res) => {
  const pending = await institutionMemberService.listPendingMembers(req.params.institutionId);
  return res
    .status(200)
    .json(new ApiResponse(200, pending, "Pending member requests fetched successfully."));
});

/**
 * Approve a pending member join request
 * POST /api/institutions/:institutionId/members/:memberId/approve
 */
export const approveMember = asyncHandler(async (req, res) => {
  const member = await institutionMemberService.approveMember(
    req.params.institutionId,
    req.params.memberId,
    req.user.user_uuid,
    req.body.roleId || null
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Member approved successfully."));
});

/**
 * Reject a pending member join request
 * POST /api/institutions/:institutionId/members/:memberId/reject
 */
export const rejectMember = asyncHandler(async (req, res) => {
  const member = await institutionMemberService.rejectMember(
    req.params.institutionId,
    req.params.memberId,
    req.user.user_uuid
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Member request rejected."));
});

/**
 * Assign or update a member's role
 * PUT /api/institutions/:institutionId/members/:memberId/role
 */
export const updateMemberRole = asyncHandler(async (req, res) => {
  const member = await institutionMemberService.updateMemberRole(
    req.params.institutionId,
    req.params.memberId,
    req.body.roleId
  );
  return res
    .status(200)
    .json(new ApiResponse(200, member, "Member role updated successfully."));
});

/**
 * Remove a member from the institution
 * DELETE /api/institutions/:institutionId/members/:memberId
 */
export const removeMember = asyncHandler(async (req, res) => {
  const result = await institutionMemberService.removeMember(
    req.params.institutionId,
    req.params.memberId,
    req.user.user_uuid
  );
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Member removed successfully."));
});
