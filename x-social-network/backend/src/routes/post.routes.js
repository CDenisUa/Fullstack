// Core
import express from 'express';
// Middleware
import {protectRoute} from "#src/middleware/protectRoute.js";
// Controllers
import {
    createPost
} from '#controllers/post.controller.js'

const router = express.Router();

router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, () => {});
router.post('/comment/:id', protectRoute, () => {});
router.delete('/', protectRoute, () => {})

export default router;