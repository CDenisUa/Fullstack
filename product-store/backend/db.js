// Core
import {config} from "dotenv";
import mongoose from "mongoose";

config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // 1 code means exit with failure, 0 means success
    });