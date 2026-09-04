import express from "express";
import authRoutes from "../routes/auth.routes.js";
import institutionRoutes from "../routes/institution.routes.js";
import organizationRoutes from "../routes/organization.routes.js";
import profileRoutes from "../routes/profile.routes.js";
import permissionRoutes from "../routes/permission.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/institutions", institutionRoutes);
router.use("/organizations", organizationRoutes);
router.use("/profile", profileRoutes);
router.use("/permissions", permissionRoutes);

export default router;
