import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as authService from "../services/auth.service.js";

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.registerUser(req.body);
  authService.setAuthCookie(res, token);

  return res
    .status(201)
    .json(new ApiResponse(201, { user, token }, "User registered successfully."));
});

/**
 * Login existing user
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  authService.setAuthCookie(res, token);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Logged in successfully."));
});

/**
 * Logout current user
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req, res) => {
  authService.clearAuthCookie(res);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully."));
});

/**
 * Get current user profile and tenant memberships
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUserProfile(req.user.user_uuid);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user profile fetched successfully."));
});
