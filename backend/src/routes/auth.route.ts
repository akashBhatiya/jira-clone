import express, { Router, Request, Response } from "express";
const router: Router = express.Router();

import * as authController from "../controllers/auth.controller";

router.get("/register", authController.register);
router.get("/login", authController.loginUser);
router.get("/me", authController.getUserDetails);
router.get("/update", authController.updateUser);
router.get("/invite", authController.inviteUser);

export default router;
