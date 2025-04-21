import { Request, Response } from "express";
import User from "../models/MONGO/User";
import Organization from "../models/MONGO/Organization";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, displayName } = req.body;
    const existingUser = await User.findOne({ uid: user.uid });
    if (existingUser) {
      res.status(200).json(existingUser);
      return;
    }

    // Create new user
    const newUser = await User.create({
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.displayName || "",
      photoURL: user.photoURL || "",
      provider: "email",
      role: "admin",
    });

    res.status(201).json({ dbUser: newUser });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, description, uid } = req.body;
    const user = await User.findOne({ uid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const organization = await Organization.create({
      name,
      description,
    });

    user.organization = organization._id;
    await user.save();
    res.status(201).json({ organization });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;
    const user = await User.findOne({ uid: uid });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
