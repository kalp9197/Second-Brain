import mongoose from "mongoose";
const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    link: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    shareLink: {
      type: String,
      unique: true,
      sparse: true 
    }
  },
  {
    timestamps: true 
  }
);
const contentModel = mongoose.model("Content", contentSchema);
export default contentModel;
