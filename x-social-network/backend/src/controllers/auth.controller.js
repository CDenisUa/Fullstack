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

export const logIn = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).send({ error: "Username and password are required" });
        }

        const user = await User.findOne({ userName });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect) {
            return res.status(400).send({ error: "Invalid password" });
        }

        if(!user || !isPasswordCorrect) return res.status(400).send({ error: "Invalid username or password" });

        generateTokenAndSetCookie(user['_id'], res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            email: user.email,
            followers: user.followers,
            followings: user.followings,
            profileImg: user.profileImg,
            coverImg: user.coverImg
        })
    } catch (error) {
        console.log('Error in logIn controller',error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

export const logOut = (req, res) => {
   try {
       if (!req.cookies.jwt) {
           return res.status(400).json({ message: "No active session" });
       }
       res.cookie("jwt", "", {
           httpOnly: true,
           secure: process.env.NODE_ENV === "development",
           sameSite: "strict",
           maxAge: 0
       });
       res.status(200).json({
           message: "Logged out successfully",
       });
   } catch(error){
       console.log('Error in logOut controller',error.message);
       res.status(500).send({ error: "Internal Server Error" });
   }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user['_id']).select("-password");
        res.status(200).json(user);
    } catch(error) {
        console.log('Error in getMe controller',error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
}