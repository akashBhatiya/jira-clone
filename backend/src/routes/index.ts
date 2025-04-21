import express, { Router, Request, Response } from "express";
import authRoute from "./auth.route";

const router: Router = express.Router();

router.use("/auth", authRoute);

router.get("/", (req: Request, res: Response) => {
  res.send("API is working properly");
});

export default router;
