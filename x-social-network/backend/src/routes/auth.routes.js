// Core
import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.json({
        data: 'Sign up successfully'
    })
})

export default router;