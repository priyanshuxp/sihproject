import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as organizationService from "../services/organization.service.js";

/**
 * Onboard/Create a new organization (creator becomes Owner)
 * POST /api/organizations
 */
export const createOrganization = asyncHandler(async (req, res) => {
  const result = await organizationService.createOrganization(req.user.user_uuid, req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, result, "Organization created successfully."));
});

/**
 * Get organization details by ID
 * GET /api/organizations/:organizationId
 */
export const getOrganization = asyncHandler(async (req, res) => {
  const organization = await organizationService.getOrganizationById(req.params.organizationId);
  return res
    .status(200)
    .json(new ApiResponse(200, organization, "Organization fetched successfully."));
});

/**
 * Update organization details
 * PUT /api/organizations/:organizationId
 */
export const updateOrganization = asyncHandler(async (req, res) => {
  const updated = await organizationService.updateOrganization(req.params.organizationId, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Organization updated successfully."));
});

/**
 * Request to join organization as employee
 * POST /api/organizations/:organizationId/join
 */
export const joinOrganization = asyncHandler(async (req, res) => {
  const membership = await organizationService.joinOrganization(
    req.user.user_uuid,
    req.params.organizationId,
    req.body.jobTitle
  );
  return res
    .status(200)
    .json(new ApiResponse(200, membership, "Join request submitted successfully. Awaiting approval."));
});
