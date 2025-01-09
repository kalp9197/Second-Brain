import { Request, Response } from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({
        msg: "User already exists",
        success: false,
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      msg: "User signed up successfully",
      success: true,
    });
  } catch (error: unknown) {
    res.status(500).json({
      msg: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(409).json({
        msg: "User does not exist plz signup",
      });
      return;
    }
    //@ts-ignore
    const isPassword = await bcrypt.compare(password, user.password);
    if (user) {
      await User.findOne({
        username,
        password: isPassword,
      });
    }
    res.status(201).json({
      msg: "User Signin successfully",
      success: true,
    });
    return;
  } catch (err) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
    return;
  }
};
