import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

import * as authController from "../controllers/auth.controller";
import { authenticate } from "../middleware/authMiddleware";

router.post("/register", authController.register);
router.post("/organization", authController.createOrganization);
router.get("/me", authController.getUserDetails);
router.get("/get-users", authenticate, authController.getUsers);
router.post("/invite", authenticate, authController.inviteUser);

export default router;
