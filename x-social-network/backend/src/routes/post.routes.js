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
    likeUnlikePost,
    getLikedPosts,
    getFollowPosts
} from '#controllers/post.controller.js'

const router = express.Router();

router.get('/all', protectRoute, getAllPosts);
router.get('/following', protectRoute, getFollowPosts);
router.get('/likes/:id', protectRoute, getLikedPosts);
router.post('/create', protectRoute, createPost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/comment/:id', protectRoute, commentOnPost);
router.delete('/:id', protectRoute, deletePost);

export default router;