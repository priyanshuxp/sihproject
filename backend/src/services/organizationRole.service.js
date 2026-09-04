import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

/**
 * List all custom roles for an organization
 */
export const listRoles = async (organizationId) => {
  return await prisma.organizationRole.findMany({
    where: { organization_id: organizationId },
    include: {
      organizationRolePermissions: {
        include: {
          permission: true,
        },
      },
      _count: {
        select: {
          organizationMembers: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/**
 * Create a new custom role for an organization
 */
export const createRole = async (organizationId, data) => {
  const normalizedName = data.name.trim();

  const existing = await prisma.organizationRole.findUnique({
    where: {
      name_organization_id: {
        name: normalizedName,
        organization_id: organizationId,
      },
    },
  });

  if (existing) {
    throw new ApiError(409, `A role with name "${normalizedName}" already exists in this organization.`);
  }

  return await prisma.organizationRole.create({
    data: {
      name: normalizedName,
      description: data.description?.trim() || null,
      organization_id: organizationId,
    },
  });
};

/**
 * Get role details with tenant isolation verification
 */
export const getRoleById = async (organizationId, roleId) => {
  const role = await prisma.organizationRole.findFirst({
    where: {
      organizationrole_uuid: roleId,
      organization_id: organizationId,
    },
    include: {
      organizationRolePermissions: {
        include: {
          permission: true,
        },
      },
      _count: {
        select: {
          organizationMembers: true,
        },
      },
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this organization.");
  }

  return role;
};

/**
 * Update role with tenant isolation verification
 */
export const updateRole = async (organizationId, roleId, data) => {
  const role = await prisma.organizationRole.findFirst({
    where: {
      organizationrole_uuid: roleId,
      organization_id: organizationId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this organization.");
  }

  if (data.name && data.name.trim() !== role.name) {
    const existing = await prisma.organizationRole.findUnique({
      where: {
        name_organization_id: {
          name: data.name.trim(),
          organization_id: organizationId,
        },
      },
    });
    if (existing) {
      throw new ApiError(409, `A role named "${data.name.trim()}" already exists in this organization.`);
    }
  }

  return await prisma.organizationRole.update({
    where: { organizationrole_uuid: roleId },
    data: {
      name: data.name !== undefined ? data.name.trim() : undefined,
      description: data.description !== undefined ? data.description?.trim() || null : undefined,
    },
  });
};

/**
 * Delete a role with tenant isolation verification
 */
export const deleteRole = async (organizationId, roleId) => {
  const role = await prisma.organizationRole.findFirst({
    where: {
      organizationrole_uuid: roleId,
      organization_id: organizationId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this organization.");
  }

  await prisma.organizationRole.delete({
    where: { organizationrole_uuid: roleId },
  });

  return { message: "Role successfully deleted." };
};

/**
 * Get permissions assigned to a role
 */
export const getRolePermissions = async (organizationId, roleId) => {
  const role = await prisma.organizationRole.findFirst({
    where: {
      organizationrole_uuid: roleId,
      organization_id: organizationId,
    },
    include: {
      organizationRolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this organization.");
  }

  return role.organizationRolePermissions.map((rp) => rp.permission);
};

/**
 * Replace/Assign permissions for a role (atomic transaction)
 */
export const updateRolePermissions = async (organizationId, roleId, permissionIdentifiers) => {
  const role = await prisma.organizationRole.findFirst({
    where: {
      organizationrole_uuid: roleId,
      organization_id: organizationId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this organization.");
  }

  return await prisma.$transaction(async (tx) => {
    // 1. Resolve permission UUIDs
    const resolvedPermissions = await tx.permission.findMany({
      where: {
        OR: [
          { permission_uuid: { in: permissionIdentifiers } },
          { code: { in: permissionIdentifiers } },
        ],
      },
    });

    if (resolvedPermissions.length !== permissionIdentifiers.length) {
      const foundIds = new Set([
        ...resolvedPermissions.map((p) => p.permission_uuid),
        ...resolvedPermissions.map((p) => p.code),
      ]);
      const missing = permissionIdentifiers.filter((id) => !foundIds.has(id));
      throw new ApiError(400, `Invalid permission identifier(s): ${missing.join(", ")}`);
    }

    // 2. Remove existing role-permission mappings
    await tx.organizationRolePermission.deleteMany({
      where: { organizationrole_id: roleId },
    });

    // 3. Create new mappings
    if (resolvedPermissions.length > 0) {
      await tx.organizationRolePermission.createMany({
        data: resolvedPermissions.map((perm) => ({
          organizationrole_id: roleId,
          permission_id: perm.permission_uuid,
        })),
      });
    }

    // 4. Return updated role with permissions
    return await tx.organizationRole.findUnique({
      where: { organizationrole_uuid: roleId },
      include: {
        organizationRolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  });
};
