import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as institutionService from "../services/institution.service.js";

/**
 * Onboard/Create a new institution (creator becomes Owner)
 * POST /api/institutions
 */
export const createInstitution = asyncHandler(async (req, res) => {
  const result = await institutionService.createInstitution(req.user.user_uuid, req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, result, "Institution created successfully."));
});

/**
 * Get institution details by ID
 * GET /api/institutions/:institutionId
 */
export const getInstitution = asyncHandler(async (req, res) => {
  const institution = await institutionService.getInstitutionById(req.params.institutionId);
  return res
    .status(200)
    .json(new ApiResponse(200, institution, "Institution fetched successfully."));
});

/**
 * Update institution details
 * PUT /api/institutions/:institutionId
 */
export const updateInstitution = asyncHandler(async (req, res) => {
  const updated = await institutionService.updateInstitution(req.params.institutionId, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Institution updated successfully."));
});

/**
 * Request to join institution
 * POST /api/institutions/:institutionId/join
 */
export const joinInstitution = asyncHandler(async (req, res) => {
  const membership = await institutionService.joinInstitution(req.user.user_uuid, req.params.institutionId);
  return res
    .status(200)
    .json(new ApiResponse(200, membership, "Join request submitted successfully. Awaiting approval."));
});
