import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid"; 
import contentModel from "../models/contentModel.js"; 

export const shareContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      res.status(400).json({ msg: "Content ID is required" });
      return;
    }

    const content = await contentModel.findById(contentId);

    if (!content) {
      res.status(404).json({ msg: "Content not found" });
      return;
    }

    const shareLink = uuidv4();
 
    await contentModel.updateOne(
      { _id: contentId },
      { $set: { shareLink } } 
    );

    res.status(200).json({ msg: "Content shared successfully", shareLink });
  } catch (err) {
    console.error("Error sharing content:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getSharedContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shareLink } = req.params;

    const content = await contentModel.findOne({ shareLink });

    if (!content) {
      res.status(404).json({ msg: "Content not found or link expired" });
      return;
    }

    res.status(200).json({ content });
  } catch (err) {
    console.error("Error retrieving shared content:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};