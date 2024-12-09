// Core
import express from 'express';
// Middleware
import {
    protectRoute
} from '#src/middleware/protectRoute.js'
// Controllers
import {
    signUp,
    logIn,
    logOut,
    getMe
} from '#controllers/auth.controller.js';

const router = express.Router();

router.get('/me', protectRoute, getMe);
router.get('/logout', logOut);
router.post('/signup', signUp);
router.post('/login', logIn);

export default router;