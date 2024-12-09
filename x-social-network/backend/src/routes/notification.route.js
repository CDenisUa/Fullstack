// Core
import express from 'express';
// Middlewares
import {protectRoute} from "#src/middleware/protectRoute.js";
// Controllers
import {
    getNotifications,
    deleteNotifications
} from "#controllers/notification.controller.js";

const router = express.Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotifications);

export default router;