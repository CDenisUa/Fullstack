// Core
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// Lib
import {connectDB} from "#src/lib/db.js";
// Routes
import authRoutes from '#routes/auth.route.js';
import messageRoutes from '#routes/message.route.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    connectDB().catch((error) => console.log("MongoDB connection error:", error));
});