import { Request, Response } from "express";
import mongoose from "mongoose";
import contentModel from "../models/contentModel.js";
interface CustomRequest extends Request {
  userId?: string;
}
export const addContent = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { title, description, link } = req.body;
    if (!title || !description || !link) {
      res.status(400).json({ msg: "Title, description, and link are required" });
      return;
    }
    if (!req.userId) {
      res.status(401).json({ msg: "Unauthorized: User ID missing" });
      return;
    }
    const newContent = await contentModel.create({
      title,
      description,
      link,
      userId: req.userId,
      tags: [],
    });
    res.status(201).json({ msg: "Content added successfully", content: newContent });
  } catch (err) {
    console.error("Error adding content:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const getContent = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ msg: "Unauthorized: User is not authenticated" });
      return;
    }
    const content = await contentModel.find({ userId: req.userId }).populate("userId", "username");
    res.status(200).json({ content });
  } catch (err) {
    console.error("Error getting content:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteContent = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ msg: "Content ID is required" });
      return;
    }
    if (!req.userId) {
      res.status(401).json({ msg: "Unauthorized: User ID missing" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ msg: "Invalid Content ID" });
      return;
    }
    const content = await contentModel.findOne({ _id: id, userId: req.userId });
    if (!content) {
      res.status(404).json({ msg: "Content not found" });
      return;
    }
    await contentModel.deleteOne({ _id: id, userId: req.userId });
    res.status(200).json({ msg: "Content deleted successfully" });
  } catch (err) {
    console.error("Error deleting content:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
