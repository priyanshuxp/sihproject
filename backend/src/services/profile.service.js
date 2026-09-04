import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";

/**
 * Get student profile for current user
 */
export const getStudentProfile = async (userId) => {
  const profile = await prisma.studentProfile.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        select: {
          user_uuid: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
        },
      },
    },
  });

  if (!profile) {
    throw new ApiError(404, "Student profile not found. Please create one.");
  }

  return profile;
};

/**
 * Upsert student profile for current user
 */
export const upsertStudentProfile = async (userId, data) => {
  return await prisma.studentProfile.upsert({
    where: { user_id: userId },
    update: {
      bio: data.bio !== undefined ? data.bio?.trim() || null : undefined,
      course: data.course !== undefined ? data.course?.trim() || null : undefined,
      department: data.department !== undefined ? data.department?.trim() || null : undefined,
      currentYear: data.currentYear !== undefined ? data.currentYear : undefined,
      enrollmentNumber: data.enrollmentNumber !== undefined ? data.enrollmentNumber?.trim() || null : undefined,
      city: data.city !== undefined ? data.city?.trim() || null : undefined,
      state: data.state !== undefined ? data.state?.trim() || null : undefined,
      country: data.country !== undefined ? data.country?.trim() || null : undefined,
    },
    create: {
      user_id: userId,
      bio: data.bio?.trim() || null,
      course: data.course?.trim() || null,
      department: data.department?.trim() || null,
      currentYear: data.currentYear || null,
      enrollmentNumber: data.enrollmentNumber?.trim() || null,
      city: data.city?.trim() || null,
      state: data.state?.trim() || null,
      country: data.country?.trim() || null,
    },
    include: {
      user: {
        select: {
          user_uuid: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
        },
      },
    },
  });
};

/**
 * Get academician profile for current user
 */
export const getAcademicianProfile = async (userId) => {
  const profile = await prisma.academicianProfile.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        select: {
          user_uuid: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
        },
      },
    },
  });

  if (!profile) {
    throw new ApiError(404, "Academician profile not found. Please create one.");
  }

  return profile;
};

/**
 * Upsert academician profile for current user
 */
export const upsertAcademicianProfile = async (userId, data) => {
  return await prisma.academicianProfile.upsert({
    where: { user_id: userId },
    update: {
      designation: data.designation !== undefined ? data.designation?.trim() || null : undefined,
      department: data.department !== undefined ? data.department?.trim() || null : undefined,
      qualification: data.qualification !== undefined ? data.qualification?.trim() || null : undefined,
      specialization: data.specialization !== undefined ? data.specialization?.trim() || null : undefined,
      experienceYears: data.experienceYears !== undefined ? data.experienceYears : undefined,
      bio: data.bio !== undefined ? data.bio?.trim() || null : undefined,
    },
    create: {
      user_id: userId,
      designation: data.designation?.trim() || null,
      department: data.department?.trim() || null,
      qualification: data.qualification?.trim() || null,
      specialization: data.specialization?.trim() || null,
      experienceYears: data.experienceYears || null,
      bio: data.bio?.trim() || null,
    },
    include: {
      user: {
        select: {
          user_uuid: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          avatar: true,
        },
      },
    },
  });
};
