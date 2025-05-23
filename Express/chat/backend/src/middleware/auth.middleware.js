// Core
import jwt from 'jsonwebtoken';

// Models
import User from '#models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send('Unauthorized - No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).send('Unauthorized - Invalid token');
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(401).send('User not found');
        }

        req.user = user;

        next();
    } catch (error) {
        console.log('Error in protectRoute middleware: ',error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}