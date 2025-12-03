import type { Request, Response } from "express";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req: Request & { user: any }, res: Response) => {
  const loggedInUserId = req.user["_id"];
  try {
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error: any) {
    console.log("Error in getUsersForSidebar", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getMessages = async (req: Request & { user: any }, res: Response) => {
  const { id: userToChatId } = req.params as { id: string };
  const myId = req.user["_id"];
  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error: any) {
    console.log("Error in getMessages", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const sentMessage = async (req: Request & { user: any }, res: Response) => {
  const { text, image } = req.body as { text?: string; image?: string };
  const { id: receiverId } = req.params as { id: string };
  const senderId = req.user["_id"];
  let imageUrl: string | undefined;
  try {
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({ senderId, receiverId, text, image: imageUrl });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error: any) {
    console.log("Error in sentMessage", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
