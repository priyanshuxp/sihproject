import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

/**
 * List all custom roles for an institution
 */
export const listRoles = async (institutionId) => {
  return await prisma.institutionRole.findMany({
    where: { institution_id: institutionId },
    include: {
      institutionRolePermissions: {
        include: {
          permission: true,
        },
      },
      _count: {
        select: {
          institutionMembers: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
};

/**
 * Create a new custom role for an institution
 */
export const createRole = async (institutionId, data) => {
  const normalizedName = data.name.trim();

  const existing = await prisma.institutionRole.findUnique({
    where: {
      name_institution_id: {
        name: normalizedName,
        institution_id: institutionId,
      },
    },
  });

  if (existing) {
    throw new ApiError(409, `A role with name "${normalizedName}" already exists in this institution.`);
  }

  return await prisma.institutionRole.create({
    data: {
      name: normalizedName,
      description: data.description?.trim() || null,
      institution_id: institutionId,
    },
  });
};

/**
 * Get role details with tenant isolation verification
 */
export const getRoleById = async (institutionId, roleId) => {
  const role = await prisma.institutionRole.findFirst({
    where: {
      institutionrole_uuid: roleId,
      institution_id: institutionId,
    },
    include: {
      institutionRolePermissions: {
        include: {
          permission: true,
        },
      },
      _count: {
        select: {
          institutionMembers: true,
        },
      },
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this institution.");
  }

  return role;
};

/**
 * Update role with tenant isolation verification
 */
export const updateRole = async (institutionId, roleId, data) => {
  const role = await prisma.institutionRole.findFirst({
    where: {
      institutionrole_uuid: roleId,
      institution_id: institutionId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this institution.");
  }

  if (data.name && data.name.trim() !== role.name) {
    const existing = await prisma.institutionRole.findUnique({
      where: {
        name_institution_id: {
          name: data.name.trim(),
          institution_id: institutionId,
        },
      },
    });
    if (existing) {
      throw new ApiError(409, `A role named "${data.name.trim()}" already exists in this institution.`);
    }
  }

  return await prisma.institutionRole.update({
    where: { institutionrole_uuid: roleId },
    data: {
      name: data.name !== undefined ? data.name.trim() : undefined,
      description: data.description !== undefined ? data.description?.trim() || null : undefined,
    },
  });
};

/**
 * Delete a role with tenant isolation verification
 */
export const deleteRole = async (institutionId, roleId) => {
  const role = await prisma.institutionRole.findFirst({
    where: {
      institutionrole_uuid: roleId,
      institution_id: institutionId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this institution.");
  }

  await prisma.institutionRole.delete({
    where: { institutionrole_uuid: roleId },
  });

  return { message: "Role successfully deleted." };
};

/**
 * Get permissions assigned to a role
 */
export const getRolePermissions = async (institutionId, roleId) => {
  const role = await prisma.institutionRole.findFirst({
    where: {
      institutionrole_uuid: roleId,
      institution_id: institutionId,
    },
    include: {
      institutionRolePermissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this institution.");
  }

  return role.institutionRolePermissions.map((rp) => rp.permission);
};

/**
 * Replace/Assign permissions for a role (atomic transaction)
 */
export const updateRolePermissions = async (institutionId, roleId, permissionIdentifiers) => {
  const role = await prisma.institutionRole.findFirst({
    where: {
      institutionrole_uuid: roleId,
      institution_id: institutionId,
    },
  });

  if (!role) {
    throw new ApiError(404, "Role not found in this institution.");
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
    await tx.institutionRolePermission.deleteMany({
      where: { institutionrole_id: roleId },
    });

    // 3. Create new mappings
    if (resolvedPermissions.length > 0) {
      await tx.institutionRolePermission.createMany({
        data: resolvedPermissions.map((perm) => ({
          institutionrole_id: roleId,
          permission_id: perm.permission_uuid,
        })),
      });
    }

    // 4. Return updated role with permissions
    return await tx.institutionRole.findUnique({
      where: { institutionrole_uuid: roleId },
      include: {
        institutionRolePermissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  });
};
