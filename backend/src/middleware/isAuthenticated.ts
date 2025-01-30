import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
interface CustomRequest extends Request {
  userId?: string; 
}
export const isAuthenticated = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ msg: "User is not Authenticated" });
      return;
    }
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in the environment variables.");
    }
    const decoded = (await jwt.verify(token, process.env.SECRET_KEY)) as JwtPayload;
    if (!decoded || typeof decoded !== "object" || !decoded.userId) {
      res.status(401).json({ msg: "Invalid Token" });
      return;
    }
    req.userId = decoded.userId; 
    next();
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};