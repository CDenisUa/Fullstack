// Core
import bcrypt from 'bcryptjs';
// Utils
import { generateToken } from '#lib/utils.js';
// Models
import User from "#models/user.model.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!email || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            generateToken(newUser['_id'], res);
            await newUser.save();

            res.status(201).json({
                _id: newUser['_id'],
                fullName: newUser['fullName'],
                email: newUser['email'],
                profilePicture: newUser['profilePicture'],
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};