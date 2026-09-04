import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

/**
 * Onboard a new institution (atomic creation with creator as Owner)
 */
export const createInstitution = async (userId, data) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the institution record
    const institution = await tx.institution.create({
      data: {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        website: data.website?.trim() || null,
        logo: data.logo?.trim() || null,
        email: data.email?.trim() || null,
        phone: data.phone?.trim() || null,
        address: data.address?.trim() || null,
        city: data.city?.trim() || null,
        state: data.state?.trim() || null,
        country: data.country?.trim() || null,
        status: "ACTIVE",
      },
    });

    // 2. Add creator as Owner Member with ACTIVE status
    const ownerMember = await tx.institutionMember.create({
      data: {
        user_id: userId,
        institution_id: institution.institution_uuid,
        isOwner: true,
        status: "ACTIVE",
        approvedAt: new Date(),
      },
      include: {
        user: {
          select: {
            user_uuid: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return {
      institution,
      owner: ownerMember,
    };
  });
};

/**
 * Get institution details by UUID
 */
export const getInstitutionById = async (institutionId) => {
  const institution = await prisma.institution.findUnique({
    where: { institution_uuid: institutionId },
    include: {
      _count: {
        select: {
          institutionMembers: true,
          institutionRoles: true,
        },
      },
    },
  });

  if (!institution) {
    throw new ApiError(404, "Institution not found.");
  }

  return institution;
};

/**
 * Update institution metadata
 */
export const updateInstitution = async (institutionId, data) => {
  const existing = await prisma.institution.findUnique({
    where: { institution_uuid: institutionId },
  });

  if (!existing) {
    throw new ApiError(404, "Institution not found.");
  }

  const updated = await prisma.institution.update({
    where: { institution_uuid: institutionId },
    data: {
      name: data.name !== undefined ? data.name.trim() : undefined,
      description: data.description !== undefined ? data.description?.trim() || null : undefined,
      website: data.website !== undefined ? data.website?.trim() || null : undefined,
      logo: data.logo !== undefined ? data.logo?.trim() || null : undefined,
      email: data.email !== undefined ? data.email?.trim() || null : undefined,
      phone: data.phone !== undefined ? data.phone?.trim() || null : undefined,
      address: data.address !== undefined ? data.address?.trim() || null : undefined,
      city: data.city !== undefined ? data.city?.trim() || null : undefined,
      state: data.state !== undefined ? data.state?.trim() || null : undefined,
      country: data.country !== undefined ? data.country?.trim() || null : undefined,
      status: data.status !== undefined ? data.status : undefined,
    },
  });

  return updated;
};

/**
 * Request to join an institution as a member (student / academician)
 */
export const joinInstitution = async (userId, institutionId) => {
  const institution = await prisma.institution.findUnique({
    where: { institution_uuid: institutionId },
  });

  if (!institution) {
    throw new ApiError(404, "Institution not found.");
  }

  if (institution.status !== "ACTIVE") {
    throw new ApiError(400, "This institution is not currently accepting join requests.");
  }

  const existingMember = await prisma.institutionMember.findUnique({
    where: {
      user_id_institution_id: {
        user_id: userId,
        institution_id: institutionId,
      },
    },
  });

  if (existingMember) {
    if (existingMember.status === "ACTIVE") {
      throw new ApiError(409, "You are already an active member of this institution.");
    }
    if (existingMember.status === "PENDING") {
      throw new ApiError(409, "Your request to join this institution is already pending approval.");
    }
    // If previously rejected or inactive, allow re-requesting
    return await prisma.institutionMember.update({
      where: { institutionmember_uuid: existingMember.institutionmember_uuid },
      data: {
        status: "PENDING",
        requestedAt: new Date(),
        approvedAt: null,
      },
    });
  }

  return await prisma.institutionMember.create({
    data: {
      user_id: userId,
      institution_id: institutionId,
      status: "PENDING",
      isOwner: false,
    },
  });
};
