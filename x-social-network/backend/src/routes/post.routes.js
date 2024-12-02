// Core
import express from 'express';
// Middleware
import {protectRoute} from "#src/middleware/protectRoute.js";
// Controllers
import {
    getAllPosts,
    commentOnPost,
    createPost,
    deletePost,
    likeUnlikePost
} from '#controllers/post.controller.js'

const router = express.Router();

router.get('/all', protectRoute, getAllPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost)

export default router;