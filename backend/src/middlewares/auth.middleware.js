import jwt from "jsonwebtoken";
import config from "../config/env.js";
import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Middleware to authenticate user from HttpOnly cookie or Bearer token
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Authentication required. No token provided.");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, config.jwtSecret);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Session expired. Please log in again.");
    }
    throw new ApiError(401, "Invalid authentication token.");
  }

  const user = await prisma.user.findUnique({
    where: { user_uuid: decoded.userId },
    select: {
      user_uuid: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      avatar: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found. Invalid token.");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "User account is suspended or inactive.");
  }

  req.user = user;
  next();
});

/**
 * Middleware to require active membership in the target institution
 */
export const requireInstitutionMember = asyncHandler(async (req, res, next) => {
  const { institutionId } = req.params;

  if (!institutionId) {
    throw new ApiError(400, "Institution ID is required in route parameter.");
  }

  const member = await prisma.institutionMember.findUnique({
    where: {
      user_id_institution_id: {
        user_id: req.user.user_uuid,
        institution_id: institutionId,
      },
    },
    include: {
      institution: true,
      institutionRole: {
        include: {
          institutionRolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!member || member.status !== "ACTIVE") {
    throw new ApiError(403, "Access denied. You are not an active member of this institution.");
  }

  req.institutionMember = member;
  next();
});

/**
 * Middleware factory to enforce specific institution permission or owner access
 * @param {string} permissionCode 
 */
export const requireInstitutionPermission = (permissionCode) => {
  return asyncHandler(async (req, res, next) => {
    const { institutionId } = req.params;

    if (!institutionId) {
      throw new ApiError(400, "Institution ID is required in route parameter.");
    }

    const member = await prisma.institutionMember.findUnique({
      where: {
        user_id_institution_id: {
          user_id: req.user.user_uuid,
          institution_id: institutionId,
        },
      },
      include: {
        institution: true,
        institutionRole: {
          include: {
            institutionRolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!member || member.status !== "ACTIVE") {
      throw new ApiError(403, "Access denied. You are not an active member of this institution.");
    }

    // Owner has full administrative permissions within the institution
    if (member.isOwner) {
      req.institutionMember = member;
      return next();
    }

    // Check if member has assigned role and the role has the requested permission
    const permissions = member.institutionRole?.institutionRolePermissions?.map(
      (rp) => rp.permission.code
    ) || [];

    if (!permissions.includes(permissionCode)) {
      throw new ApiError(
        403,
        `Access denied. You do not have the required permission: ${permissionCode}`
      );
    }

    req.institutionMember = member;
    next();
  });
};

/**
 * Middleware to require active membership in the target organization
 */
export const requireOrganizationMember = asyncHandler(async (req, res, next) => {
  const { organizationId } = req.params;

  if (!organizationId) {
    throw new ApiError(400, "Organization ID is required in route parameter.");
  }

  const member = await prisma.organizationMember.findUnique({
    where: {
      user_id_organization_id: {
        user_id: req.user.user_uuid,
        organization_id: organizationId,
      },
    },
    include: {
      organization: true,
      organizationRole: {
        include: {
          organizationRolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!member || member.status !== "ACTIVE") {
    throw new ApiError(403, "Access denied. You are not an active member of this organization.");
  }

  req.organizationMember = member;
  next();
});

/**
 * Middleware factory to enforce specific organization permission or owner access
 * @param {string} permissionCode 
 */
export const requireOrganizationPermission = (permissionCode) => {
  return asyncHandler(async (req, res, next) => {
    const { organizationId } = req.params;

    if (!organizationId) {
      throw new ApiError(400, "Organization ID is required in route parameter.");
    }

    const member = await prisma.organizationMember.findUnique({
      where: {
        user_id_organization_id: {
          user_id: req.user.user_uuid,
          organization_id: organizationId,
        },
      },
      include: {
        organization: true,
        organizationRole: {
          include: {
            organizationRolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!member || member.status !== "ACTIVE") {
      throw new ApiError(403, "Access denied. You are not an active member of this organization.");
    }

    // Owner has full administrative permissions within the organization
    if (member.isOwner) {
      req.organizationMember = member;
      return next();
    }

    // Check if member has assigned role and the role has the requested permission
    const permissions = member.organizationRole?.organizationRolePermissions?.map(
      (rp) => rp.permission.code
    ) || [];

    if (!permissions.includes(permissionCode)) {
      throw new ApiError(
        403,
        `Access denied. You do not have the required permission: ${permissionCode}`
      );
    }

    req.organizationMember = member;
    next();
  });
};
