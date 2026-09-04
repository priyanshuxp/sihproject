import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as profileService from "../services/profile.service.js";

/**
 * Get student profile of current user
 * GET /api/profile/student
 */
export const getStudentProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getStudentProfile(req.user.user_uuid);
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Student profile fetched successfully."));
});

/**
 * Create or update student profile of current user
 * POST/PUT /api/profile/student
 */
export const upsertStudentProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.upsertStudentProfile(req.user.user_uuid, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Student profile saved successfully."));
});

/**
 * Get academician profile of current user
 * GET /api/profile/academician
 */
export const getAcademicianProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.getAcademicianProfile(req.user.user_uuid);
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Academician profile fetched successfully."));
});

/**
 * Create or update academician profile of current user
 * POST/PUT /api/profile/academician
 */
export const upsertAcademicianProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.upsertAcademicianProfile(req.user.user_uuid, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Academician profile saved successfully."));
});
