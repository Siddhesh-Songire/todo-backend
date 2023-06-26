import { User } from "../models/user.js";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendCookie } from "../utils/features.js";
dotenv.config();

export const login = async (req, res) => {};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  //find user in database using email
  let user = await User.findOne({ email });

  //if user already exists then
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User already Exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashedPassword });

  sendCookie(user, res);
};

export const getUserDetails = async (req, res) => {};
