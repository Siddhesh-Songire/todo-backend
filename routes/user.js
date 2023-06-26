import express from "express";
import { login, register, getMyProfile } from "../controllers/user.js";

const router = express.Router();

// router.get("/all", getallusers);

router.post("/new", register);

router.post("/login", login);

router.get("/me", getMyProfile);

export default router;
