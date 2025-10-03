import { Router } from "express";
import * as moodController from "../controllers/moods.js";
import { verifyToken } from "../middleware/verify-token.js";
import { verify } from "crypto";
import Mood from "../models/mood.js";

const router = Router();
// Allows user to enter moods.
router.post("/", verifyToken, moodController.createMood);

// Get token and display all the moods.
router.get("/", verifyToken, moodController.getMoods);

// Access to the "social" route of the website
router.get("/social", moodController.getMoodSocial);

// Gives the user the oppurtunity to access a specefic mood.
router.get("/:moodId", verifyToken, moodController.getMood);

// Updates if the user adds any mood or edit.
router.put("/:moodId", verifyToken, moodController.updateMood);

// Delete absolutely everything
router.delete("/all", async (req, res) => {
  try {
    await Mood.deleteMany({}); // wipe the whole collection
    res.json({ message: "All moods deleted" });
  } catch (err) {
    console.error("Delete all moods error:", err);
    res.status(500).json({ error: "Failed to delete moods" });
  }
});

// Gives user the oppurtunity to delete a previous mood.
router.delete("/:moodId", verifyToken, moodController.deleteMood);

export default router;
