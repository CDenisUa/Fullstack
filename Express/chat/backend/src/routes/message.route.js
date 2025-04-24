// Core
import express from "express";
// Middleware
import {protectRoute} from "#middleware/auth.middleware.js";
// Controllers
import {
    sentMessage,
    getMessages,
    getUsersForSidebar
} from "#controllers/message.controller.js"

const router = express.Router();

router.get('/users', protectRoute, getUsersForSidebar)
router.get('/:id', protectRoute, getMessages)
router.post('/send/:id', protectRoute, sentMessage);

export default router;