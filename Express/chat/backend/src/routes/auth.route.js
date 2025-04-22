// Core
import express from "express";
// Middleware
import { protectRoute } from "#middleware/auth.middleware.js";
// Controllers
import {
    checkAuth,
    signup,
    login,
    logout,
    updateProfile,
} from '#controllers/auth.controller.js';

const router = express.Router();

router.get("/check", protectRoute, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);

export default router;