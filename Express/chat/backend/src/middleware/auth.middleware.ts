import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt as string | undefined;
    if (!token) return res.status(401).send("Unauthorized - No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    if (!decoded) return res.status(401).send("Unauthorized - Invalid token");

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).send("User not found");

    (req as any).user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
