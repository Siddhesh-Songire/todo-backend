import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendCookie } from "../utils/features.js";
dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  // .select is used because we want to access password  to compare with user's password
  // but while defining schema we hava give attribute of select :  false
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(404).json({
      success: false,
      message: "Invalid Email or Password",
    });
  }

  sendCookie(user, res, 200, `Welcome back, ${user.name}`);
};

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

  //function in features.js
  sendCookie(user, res, 201, "Registered Successfully");
};

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //find id
  const user = await User.findById(decoded._id);

  res.status(200).json({
    success: true,
    user,
  });
};
