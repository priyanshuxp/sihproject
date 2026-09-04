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
 * List all active members of an institution
 */
export const listMembers = async (institutionId) => {
  return await prisma.institutionMember.findMany({
    where: {
      institution_id: institutionId,
      status: "ACTIVE",
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      institutionRole: {
        select: {
          institutionrole_uuid: true,
          name: true,
          description: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/**
 * List pending join requests for an institution
 */
export const listPendingMembers = async (institutionId) => {
  return await prisma.institutionMember.findMany({
    where: {
      institution_id: institutionId,
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
 * Approve a pending member join request
 */
export const approveMember = async (institutionId, memberId, currentUserId, roleId = null) => {
  const member = await prisma.institutionMember.findFirst({
    where: {
      institutionmember_uuid: memberId,
      institution_id: institutionId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member request not found in this institution.");
  }

  // Security: Prevent self-approval
  if (member.user_id === currentUserId) {
    throw new ApiError(403, "Security violation: Users cannot approve their own membership requests.");
  }

  if (member.status === "ACTIVE") {
    throw new ApiError(400, "Member is already active.");
  }

  // If role is specified, verify it belongs to this institution
  if (roleId) {
    const role = await prisma.institutionRole.findFirst({
      where: {
        institutionrole_uuid: roleId,
        institution_id: institutionId,
      },
    });
    if (!role) {
      throw new ApiError(404, "Specified role does not exist in this institution.");
    }
  }

  return await prisma.institutionMember.update({
    where: { institutionmember_uuid: memberId },
    data: {
      status: "ACTIVE",
      approvedAt: new Date(),
      institutionrole_id: roleId || null,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      institutionRole: true,
    },
  });
};

/**
 * Reject a pending member join request
 */
export const rejectMember = async (institutionId, memberId, currentUserId) => {
  const member = await prisma.institutionMember.findFirst({
    where: {
      institutionmember_uuid: memberId,
      institution_id: institutionId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member request not found in this institution.");
  }

  // Security: Prevent self-rejection of own request through admin endpoint
  if (member.user_id === currentUserId) {
    throw new ApiError(403, "Security violation: You cannot reject your own membership request.");
  }

  return await prisma.institutionMember.update({
    where: { institutionmember_uuid: memberId },
    data: {
      status: "REJECTED",
      institutionrole_id: null,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
    },
  });
};

/**
 * Assign or update a member's role (strictly tenant-scoped)
 */
export const updateMemberRole = async (institutionId, memberId, roleId) => {
  const member = await prisma.institutionMember.findFirst({
    where: {
      institutionmember_uuid: memberId,
      institution_id: institutionId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this institution.");
  }

  if (member.status !== "ACTIVE") {
    throw new ApiError(400, "Cannot assign role to a non-active member.");
  }

  // Verify role belongs to THIS institution
  if (roleId) {
    const role = await prisma.institutionRole.findFirst({
      where: {
        institutionrole_uuid: roleId,
        institution_id: institutionId,
      },
    });

    if (!role) {
      throw new ApiError(404, "Role does not exist in this institution. Cross-tenant assignment is prohibited.");
    }
  }

  return await prisma.institutionMember.update({
    where: { institutionmember_uuid: memberId },
    data: {
      institutionrole_id: roleId,
    },
    include: {
      user: {
        select: SAFE_USER_SELECT,
      },
      institutionRole: true,
    },
  });
};

/**
 * Remove a member from the institution
 */
export const removeMember = async (institutionId, memberId, currentUserId) => {
  const member = await prisma.institutionMember.findFirst({
    where: {
      institutionmember_uuid: memberId,
      institution_id: institutionId,
    },
  });

  if (!member) {
    throw new ApiError(404, "Member not found in this institution.");
  }

  // Protect owner from accidental self-removal via remove member API
  if (member.isOwner && member.user_id === currentUserId) {
    throw new ApiError(400, "Institution owner cannot remove themselves from the institution.");
  }

  await prisma.institutionMember.delete({
    where: { institutionmember_uuid: memberId },
  });

  return { message: "Member successfully removed from the institution." };
};
