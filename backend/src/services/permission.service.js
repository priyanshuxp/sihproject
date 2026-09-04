import prisma from "../utils/PrismaClient.js";

/**
 * List all available global permissions
 */
export const listPermissions = async () => {
  return await prisma.permission.findMany({
    orderBy: { code: "asc" },
  });
};
