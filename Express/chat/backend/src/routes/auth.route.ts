import express from "express";
import { protectRoute } from "#middleware/auth.middleware";
import { checkAuth, signup, login, logout, updateProfile } from "#controllers/auth.controller";

const router = express.Router();

router.get("/check", protectRoute, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);

export default router;

