import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as permissionController from "../controllers/permission.controller.js";

const router = Router();

router.get("/", authenticate, permissionController.listPermissions);

export default router;
