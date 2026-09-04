import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

/**
 * Onboard a new organization (atomic creation with creator as Owner)
 */
export const createOrganization = async (userId, data) => {
  return await prisma.$transaction(async (tx) => {
    // 1. Create the organization record
    const organization = await tx.organization.create({
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
    const ownerMember = await tx.organizationMember.create({
      data: {
        user_id: userId,
        organization_id: organization.organization_uuid,
        isOwner: true,
        status: "ACTIVE",
        jobTitle: "Founder / Owner",
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
      organization,
      owner: ownerMember,
    };
  });
};

/**
 * Get organization details by UUID
 */
export const getOrganizationById = async (organizationId) => {
  const organization = await prisma.organization.findUnique({
    where: { organization_uuid: organizationId },
    include: {
      _count: {
        select: {
          organizationMembers: true,
          organizationRoles: true,
        },
      },
    },
  });

  if (!organization) {
    throw new ApiError(404, "Organization not found.");
  }

  return organization;
};

/**
 * Update organization metadata
 */
export const updateOrganization = async (organizationId, data) => {
  const existing = await prisma.organization.findUnique({
    where: { organization_uuid: organizationId },
  });

  if (!existing) {
    throw new ApiError(404, "Organization not found.");
  }

  const updated = await prisma.organization.update({
    where: { organization_uuid: organizationId },
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
 * Request to join an organization as an employee
 */
export const joinOrganization = async (userId, organizationId, jobTitle = null) => {
  const organization = await prisma.organization.findUnique({
    where: { organization_uuid: organizationId },
  });

  if (!organization) {
    throw new ApiError(404, "Organization not found.");
  }

  if (organization.status !== "ACTIVE") {
    throw new ApiError(400, "This organization is not currently accepting join requests.");
  }

  const existingMember = await prisma.organizationMember.findUnique({
    where: {
      user_id_organization_id: {
        user_id: userId,
        organization_id: organizationId,
      },
    },
  });

  if (existingMember) {
    if (existingMember.status === "ACTIVE") {
      throw new ApiError(409, "You are already an active member of this organization.");
    }
    if (existingMember.status === "PENDING") {
      throw new ApiError(409, "Your request to join this organization is already pending approval.");
    }
    // If previously rejected or inactive, allow re-requesting
    return await prisma.organizationMember.update({
      where: { organizationmember_uuid: existingMember.organizationmember_uuid },
      data: {
        status: "PENDING",
        jobTitle: jobTitle?.trim() || existingMember.jobTitle,
        requestedAt: new Date(),
        approvedAt: null,
      },
    });
  }

  return await prisma.organizationMember.create({
    data: {
      user_id: userId,
      organization_id: organizationId,
      jobTitle: jobTitle?.trim() || null,
      status: "PENDING",
      isOwner: false,
    },
  });
};
