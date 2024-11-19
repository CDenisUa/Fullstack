// Core
import validator from "validator";
import bcrypt from "bcryptjs";
// Utils
import {
    generateTokenAndSetCookie
} from "#src/lib/utils/generateToken.js";
// Models
import User from "#models/user.model.js"

export const signUp = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;

        if(!validator.isEmail(email)) return res.status(400).send({ error: "Invalid email format"})
        if(password.length < 6) return res.status(400).send({ error: "Password should be at least 6 characters" });

        const existingUser = await User.findOne({ userName });
        const existingEmail = await User.findOne({ email });

        if(existingUser) return res.status(400).send({ error: "User is already taken" });
        if(existingEmail) return res.status(400).send({ error: "Email is already taken" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
        });

        if(newUser) {
            try {
                await newUser.save();
            } catch (err) {
                console.error('Error saving new user:', err);
                return res.status(400).send({ error: "Invalid user data" });
            }
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                email: newUser.email,
                followers: newUser.followers,
                followings: newUser.followings,
                profileImg: newUser.profileImg,
                coverImg: newUser.coverImg
            })
        } else {
            res.status(400).send({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log('Error in signUp controller',error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export const logIn = (req, res) => {
    res.json({
        data: 'You hit the login endpoint'
    })
};

export const logOut = (req, res) => {
    res.json({
        data: 'Sign up successfully'
    })
};