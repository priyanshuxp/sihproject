import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/PrismaClient.js";
import ApiError from "../utils/ApiError.js";
import config from "../config/env.js";

const SALT_ROUNDS = 10;

/**
 * Generate signed JWT token for user
 * @param {string} userId 
 */
export const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

/**
 * Set HTTP-Only authentication cookie
 * @param {import('express').Response} res 
 * @param {string} token 
 */
export const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: config.nodeEnv === "production" ? "strict" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

/**
 * Clear authentication cookie
 * @param {import('express').Response} res 
 */
export const clearAuthCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: config.nodeEnv === "production" ? "strict" : "lax",
  });
};

/**
 * Register a new user
 */
export const registerUser = async (data) => {
  const { firstName, lastName, email, phone, password, avatar } = data;

  const normalizedEmail = email.toLowerCase().trim();

  // Check if user with same email exists
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw new ApiError(409, "A user with this email address already exists.");
  }

  if (phone) {
    const existingPhone = await prisma.user.findUnique({
      where: { phone: phone.trim() },
    });
    if (existingPhone) {
      throw new ApiError(409, "A user with this phone number already exists.");
    }
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : null,
      password: hashedPassword,
      avatar: avatar || null,
      status: "ACTIVE",
    },
    select: {
      user_uuid: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      avatar: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const token = generateToken(user.user_uuid);

  return { user, token };
};

/**
 * Login existing user
 */
export const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !user.password) {
    throw new ApiError(401, "Invalid email or password.");
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "Your account is not active. Please contact support.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateToken(user.user_uuid);

  const safeUser = {
    user_uuid: user.user_uuid,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: safeUser, token };
};

/**
 * Get current user profile and contextual memberships
 */
export const getCurrentUserProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { user_uuid: userId },
    select: {
      user_uuid: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      avatar: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      studentProfile: true,
      academicianProfile: true,
      institutionMembers: {
        where: { status: "ACTIVE" },
        include: {
          institution: {
            select: {
              institution_uuid: true,
              name: true,
              logo: true,
              city: true,
              state: true,
              status: true,
            },
          },
          institutionRole: {
            select: {
              institutionrole_uuid: true,
              name: true,
              description: true,
            },
          },
        },
      },
      organizationMembers: {
        where: { status: "ACTIVE" },
        include: {
          organization: {
            select: {
              organization_uuid: true,
              name: true,
              logo: true,
              city: true,
              state: true,
              status: true,
            },
          },
          organizationRole: {
            select: {
              organizationrole_uuid: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return user;
};
