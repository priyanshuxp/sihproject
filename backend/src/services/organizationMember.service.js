import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

const SAFE_USER_SELECT = {
  user_uuid: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  avatar: true,
  status: true,
};

/**
 * List all active members of an organization
 */
export const listMembers = async (organizationId) => {
  return await prisma.organizationMember.findMany({
    where: {
      organization_id: organizationId,
      status: "ACTIVE",
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      organizationRole: {
        select: {
          organizationrole_uuid: true,
          name: true,
          description: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/**
 * List pending join requests for an organization
 */
export const listPendingMembers = async (organizationId) => {
  return await prisma.organizationMember.findMany({
    where: {
      organization_id: organizationId,
      status: "PENDING",
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
    },
    orderBy: { requestedAt: "asc" },
  });
};

/**
 * Approve a pending employee join request
 */
export const approveMember = async (organizationId, memberId, currentUserId, roleId = null) => {
  const member = await prisma.organizationMember.findFirst({
    where: {
      organizationmember_uuid: memberId,
      organization_id: organizationId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member request not found in this organization.");
  }

  // Security: Prevent self-approval
  if (member.user_id === currentUserId) {
    throw new ApiError(403, "Security violation: Users cannot approve their own membership requests.");
  }

  if (member.status === "ACTIVE") {
    throw new ApiError(400, "Member is already active.");
  }

  // If role is specified, verify it belongs to this organization
  if (roleId) {
    const role = await prisma.organizationRole.findFirst({
      where: {
        organizationrole_uuid: roleId,
        organization_id: organizationId,
      },
    });
    if (!role) {
      throw new ApiError(404, "Specified role does not exist in this organization.");
    }
  }

  return await prisma.organizationMember.update({
    where: { organizationmember_uuid: memberId },
    data: {
      status: "ACTIVE",
      approvedAt: new Date(),
      organizationrole_id: roleId || null,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      organizationRole: true,
    },
  });
};

/**
 * Reject a pending employee join request
 */
export const rejectMember = async (organizationId, memberId, currentUserId) => {
  const member = await prisma.organizationMember.findFirst({
    where: {
      organizationmember_uuid: memberId,
      organization_id: organizationId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member request not found in this organization.");
  }

  // Security: Prevent self-rejection of own request through admin endpoint
  if (member.user_id === currentUserId) {
    throw new ApiError(403, "Security violation: You cannot reject your own membership request.");
  }

  return await prisma.organizationMember.update({
    where: { organizationmember_uuid: memberId },
    data: {
      status: "REJECTED",
      organizationrole_id: null,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
    },
  });
};

/**
 * Assign or update an employee's role (strictly tenant-scoped)
 */
export const updateMemberRole = async (organizationId, memberId, roleId) => {
  const member = await prisma.organizationMember.findFirst({
    where: {
      organizationmember_uuid: memberId,
      organization_id: organizationId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this organization.");
  }

  if (member.status !== "ACTIVE") {
    throw new ApiError(400, "Cannot assign role to a non-active member.");
  }

  // Verify role belongs to THIS organization
  if (roleId) {
    const role = await prisma.organizationRole.findFirst({
      where: {
        organizationrole_uuid: roleId,
        organization_id: organizationId,
      },
    });

    if (!role) {
      throw new ApiError(404, "Role does not exist in this organization. Cross-tenant assignment is prohibited.");
    }
  }

  return await prisma.organizationMember.update({
    where: { organizationmember_uuid: memberId },
    data: {
      organizationrole_id: roleId,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      organizationRole: true,
    },
  });
};

/**
 * Remove a member from the organization
 */
export const removeMember = async (organizationId, memberId, currentUserId) => {
  const member = await prisma.organizationMember.findFirst({
    where: {
      organizationmember_uuid: memberId,
      organization_id: organizationId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this organization.");
  }

  // Protect owner from accidental self-removal via remove member API
  if (member.isOwner && member.user_id === currentUserId) {
    throw new ApiError(400, "Organization owner cannot remove themselves from the organization.");
  }

  await prisma.organizationMember.delete({
    where: { organizationmember_uuid: memberId },
  });

  return { message: "Member successfully removed from the organization." };
};
