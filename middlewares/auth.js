import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; // get cockie using cookie parser

  if (!token) {
    res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  //decode the jwt token from
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //find id
  req.user = await User.findById(decoded._id);
  next();
};
