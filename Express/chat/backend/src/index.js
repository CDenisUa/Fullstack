// Core
import express from 'express';
import dotenv from 'dotenv';
// Lib
import {connectDB} from "#src/lib/db.js";
// Routes
import authRoutes from '#routes/auth.route.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    connectDB().catch((error) => console.log("MongoDB connection error:", error));
});