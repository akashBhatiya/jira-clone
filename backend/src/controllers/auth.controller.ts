import { Request, Response } from "express";
import User from "../models/MONGO/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { uid, email, displayName, photoURL, provider, role } = req.body;
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    // Create new user
    const user = await User.create({
      uid,
      email,
      displayName,
      photoURL,
      provider,
      role,
    });

    res.status(201).json(user);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const inviteUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
