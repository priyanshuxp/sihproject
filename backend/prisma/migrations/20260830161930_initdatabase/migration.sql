-- CreateTable
CREATE TABLE "Permission" (
    "permission_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("permission_uuid")
);

-- CreateTable
CREATE TABLE "Institution" (
    "institution_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("institution_uuid")
);

-- CreateTable
CREATE TABLE "InstitutionRole" (
    "institutionrole_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "institution_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionRole_pkey" PRIMARY KEY ("institutionrole_uuid")
);

-- CreateTable
CREATE TABLE "InstitutionRolePermission" (
    "institutionrolepermission_uuid" TEXT NOT NULL,
    "institutionrole_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionRolePermission_pkey" PRIMARY KEY ("institutionrolepermission_uuid")
);

-- CreateTable
CREATE TABLE "InstitutionMember" (
    "institutionmember_uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "institution_id" TEXT NOT NULL,
    "institutionrole_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionMember_pkey" PRIMARY KEY ("institutionmember_uuid")
);

-- CreateTable
CREATE TABLE "Organization" (
    "organization_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("organization_uuid")
);

-- CreateTable
CREATE TABLE "OrganizationRole" (
    "organizationrole_uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "organization_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationRole_pkey" PRIMARY KEY ("organizationrole_uuid")
);

-- CreateTable
CREATE TABLE "OrganizationRolePermission" (
    "organizationrolepermission_uuid" TEXT NOT NULL,
    "organizationrole_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationRolePermission_pkey" PRIMARY KEY ("organizationrolepermission_uuid")
);

-- CreateTable
CREATE TABLE "OrganizationMember" (
    "organizationmember_uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "organizationrole_id" TEXT,
    "jobTitle" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "requestedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationMember_pkey" PRIMARY KEY ("organizationmember_uuid")
);

-- CreateTable
CREATE TABLE "User" (
    "user_uuid" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "password" TEXT,
    "avatar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_uuid")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "studentprofile_uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "course" TEXT,
    "department" TEXT,
    "currentYear" INTEGER,
    "enrollmentNumber" TEXT,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("studentprofile_uuid")
);

-- CreateTable
CREATE TABLE "AcademicianProfile" (
    "academicianprofile_uuid" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "qualification" TEXT,
    "specialization" TEXT,
    "experienceYears" INTEGER,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AcademicianProfile_pkey" PRIMARY KEY ("academicianprofile_uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Permission_code_key" ON "Permission"("code");

-- CreateIndex
CREATE INDEX "InstitutionRole_institution_id_idx" ON "InstitutionRole"("institution_id");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionRole_name_institution_id_key" ON "InstitutionRole"("name", "institution_id");

-- CreateIndex
CREATE INDEX "InstitutionRolePermission_institutionrole_id_idx" ON "InstitutionRolePermission"("institutionrole_id");

-- CreateIndex
CREATE INDEX "InstitutionRolePermission_permission_id_idx" ON "InstitutionRolePermission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionRolePermission_institutionrole_id_permission_id_key" ON "InstitutionRolePermission"("institutionrole_id", "permission_id");

-- CreateIndex
CREATE INDEX "InstitutionMember_user_id_idx" ON "InstitutionMember"("user_id");

-- CreateIndex
CREATE INDEX "InstitutionMember_institution_id_idx" ON "InstitutionMember"("institution_id");

-- CreateIndex
CREATE INDEX "InstitutionMember_institutionrole_id_idx" ON "InstitutionMember"("institutionrole_id");

-- CreateIndex
CREATE UNIQUE INDEX "InstitutionMember_user_id_institution_id_key" ON "InstitutionMember"("user_id", "institution_id");

-- CreateIndex
CREATE INDEX "OrganizationRole_organization_id_idx" ON "OrganizationRole"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationRole_name_organization_id_key" ON "OrganizationRole"("name", "organization_id");

-- CreateIndex
CREATE INDEX "OrganizationRolePermission_organizationrole_id_idx" ON "OrganizationRolePermission"("organizationrole_id");

-- CreateIndex
CREATE INDEX "OrganizationRolePermission_permission_id_idx" ON "OrganizationRolePermission"("permission_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationRolePermission_organizationrole_id_permission_i_key" ON "OrganizationRolePermission"("organizationrole_id", "permission_id");

-- CreateIndex
CREATE INDEX "OrganizationMember_user_id_idx" ON "OrganizationMember"("user_id");

-- CreateIndex
CREATE INDEX "OrganizationMember_organization_id_idx" ON "OrganizationMember"("organization_id");

-- CreateIndex
CREATE INDEX "OrganizationMember_organizationrole_id_idx" ON "OrganizationMember"("organizationrole_id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationMember_user_id_organization_id_key" ON "OrganizationMember"("user_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_user_id_key" ON "StudentProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AcademicianProfile_user_id_key" ON "AcademicianProfile"("user_id");

-- AddForeignKey
ALTER TABLE "InstitutionRole" ADD CONSTRAINT "InstitutionRole_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("institution_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionRolePermission" ADD CONSTRAINT "InstitutionRolePermission_institutionrole_id_fkey" FOREIGN KEY ("institutionrole_id") REFERENCES "InstitutionRole"("institutionrole_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionRolePermission" ADD CONSTRAINT "InstitutionRolePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("permission_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionMember" ADD CONSTRAINT "InstitutionMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionMember" ADD CONSTRAINT "InstitutionMember_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "Institution"("institution_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstitutionMember" ADD CONSTRAINT "InstitutionMember_institutionrole_id_fkey" FOREIGN KEY ("institutionrole_id") REFERENCES "InstitutionRole"("institutionrole_uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRolePermission" ADD CONSTRAINT "OrganizationRolePermission_organizationrole_id_fkey" FOREIGN KEY ("organizationrole_id") REFERENCES "OrganizationRole"("organizationrole_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRolePermission" ADD CONSTRAINT "OrganizationRolePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("permission_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("organization_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationMember" ADD CONSTRAINT "OrganizationMember_organizationrole_id_fkey" FOREIGN KEY ("organizationrole_id") REFERENCES "OrganizationRole"("organizationrole_uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcademicianProfile" ADD CONSTRAINT "AcademicianProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_uuid") ON DELETE CASCADE ON UPDATE CASCADE;
