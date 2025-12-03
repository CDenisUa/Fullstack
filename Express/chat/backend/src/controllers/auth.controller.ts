import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body as { fullName?: string; email?: string; password?: string };
  if (!fullName || !email || !password) return res.status(400).json({ message: "All fields are required" });
  if ((password ?? "").length < 6) return res.status(400).json({ message: "Password must be at least 6 characters" });

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password!, salt);

    const newUser = new User({ fullName, email, password: hashedPassword });
    if (newUser) {
      generateToken(newUser["_id"].toString(), res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser["_id"],
        fullName: newUser["fullName"],
        email: newUser["email"],
        profilePicture: newUser["profilePicture"],
      });
    }
    return res.status(400).json({ message: "Invalid user data" });
  } catch (error: any) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(password ?? "", user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

    generateToken(user["_id"].toString(), res);
    return res.status(200).json({
      _id: user["_id"],
      fullName: user["fullName"],
      email: user["email"],
      profilePicture: user["profilePicture"],
      createdAt: user["createdAt"],
    });
  } catch (error: any) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request & { user: any }, res: Response) => {
  try {
    const { profilePicture } = req.body as { profilePicture?: string };
    const userId = req.user._id;
    if (!profilePicture) return res.status(400).json({ message: "Profile pic is required" });

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req: Request & { user: any }, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error: any) {
    console.log("Error in check auth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
