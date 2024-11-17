// Core
import express from 'express';
// Controllers
import {
    signUp,
    logIn,
    logOut
} from '#controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/logout', logOut);

export default router;