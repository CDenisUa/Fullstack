// Core
import express from 'express';
// Middleware
import {protectRoute} from "#src/middleware/protectRoute.js";
// Controllers
import {
    getUserProfile,
    followUnfollowUser,
} from "#controllers/user.controller.js";

const router = express.Router();

router.get('/profile/:userName',protectRoute, getUserProfile);
// router.get('/suggested',protectRoute, getUserProfile);
router.post('/follow/:id',protectRoute, followUnfollowUser);
// router.post('/update',protectRoute, updateUserProfile);

export default router;