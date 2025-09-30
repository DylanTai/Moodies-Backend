// npm
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";

const app = express();
// Import routers

import authRouter from "./controllers/auth.js";
import usersRouter from "./controllers/users.js";
import moodRouter from "./routes/mood.js";

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/moods", moodRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  // Start the server and listen on port 3000
  app.listen(3000, () => {
    console.log("The express app is ready!");
  });
});
