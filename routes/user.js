import express from "express";
import { login, register, getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// router.get("/all", getallusers);

router.post("/new", register);

router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
