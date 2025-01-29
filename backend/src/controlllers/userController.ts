import { Request, Response } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  userId?: string;
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ msg: "User already exists", success: false });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashedPassword });

    res.status(201).json({ msg: "User signed up successfully", success: true });
  } catch (error: unknown) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: (error as Error).message });
  }
};

export const signin = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(409).json({ msg: "User does not exist. Please signup." });
      return;
    }

    //@ts-ignore
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ msg: "User signed in successfully", success: true });
  } catch (error: unknown) {
    console.error("Error during signin:", error);
    res
      .status(500)
      .json({ msg: "Internal server error", error: (error as Error).message });
  }
};

export const logout = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ msg: "User logged out successfully", success: true });
  } catch (error: unknown) {
    console.error("Error during logout:", error);
    res
     .status(500)
     .json({ msg: "Internal server error", error: (error as Error).message });
  }
}