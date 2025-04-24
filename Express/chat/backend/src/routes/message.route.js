// Core
import express from "express";
// Middleware
import {protectRoute} from "#middleware/auth.middleware.js";
// Controllers
import { getUsersForSidebar } from "#controllers/message.controller.js"

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar)

export default router;