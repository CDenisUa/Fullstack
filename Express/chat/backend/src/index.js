// Core
import express from 'express';
import dotenv from 'dotenv';
// Lib
import {connectDB} from "#src/lib/db.js";
// Routes
import authRoutes from '#routes/auth.route.js';

const app = express();
dotenv.config();

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    connectDB();
});