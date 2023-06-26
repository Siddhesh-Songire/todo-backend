import express from "express";
import { login, register, getUserDetails } from "../controllers/user.js";

const router = express.Router();

// router.get("/all", getallusers);

router.post("/new", register);

router.post("/login", login);

export default router;
