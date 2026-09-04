import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const FOUNDATION_PERMISSIONS = [
  // Student permissions
  { code: "STUDENT_VIEW", name: "View student profiles and records" },
  { code: "STUDENT_VERIFY", name: "Verify student records and documents" },
  { code: "STUDENT_MANAGE", name: "Manage student profiles and statuses" },

  // Member management permissions
  { code: "MEMBER_VIEW", name: "View tenant members and directory" },
  { code: "MEMBER_INVITE", name: "Invite new members to tenant" },
  { code: "MEMBER_APPROVE", name: "Approve or reject member join requests" },
  { code: "MEMBER_REMOVE", name: "Remove members from tenant" },

  // Role & RBAC permissions
  { code: "ROLE_VIEW", name: "View tenant roles and permissions" },
  { code: "ROLE_CREATE", name: "Create custom tenant roles" },
  { code: "ROLE_UPDATE", name: "Update tenant roles" },
  { code: "ROLE_DELETE", name: "Delete custom tenant roles" },
  { code: "ROLE_ASSIGN", name: "Assign roles to tenant members and permissions to roles" },

  // Tenant management permissions
  { code: "INSTITUTION_VIEW", name: "View institution details and settings" },
  { code: "INSTITUTION_UPDATE", name: "Update institution profile and details" },

  { code: "ORGANIZATION_VIEW", name: "View organization details and settings" },
  { code: "ORGANIZATION_UPDATE", name: "Update organization profile and details" },

  // User & Profile permissions
  { code: "PROFILE_VIEW", name: "View user profiles" },
  { code: "PROFILE_UPDATE", name: "Update personal profile information" },

  // Permission directory
  { code: "PERMISSION_VIEW", name: "View available platform permissions" },
];

async function main() {
  console.log("🌱 Seeding foundational platform permissions...");

  let seededCount = 0;
  for (const perm of FOUNDATION_PERMISSIONS) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: { name: perm.name },
      create: {
        name: perm.name,
        code: perm.code,
      },
    });
    seededCount++;
  }

  console.log(`✅ Successfully seeded ${seededCount} foundation permissions.`);
}

main()
  .catch((e) => {
    console.error("❌ Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
