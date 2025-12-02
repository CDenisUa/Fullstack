import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "#src/lib/db";
import authRoutes from "#routes/auth.route";
import messageRoutes from "#routes/message.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB().catch((error) => console.log("MongoDB connection error:", error));
});
