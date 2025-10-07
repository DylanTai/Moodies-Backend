import { Router } from "express";
const router = Router();
import User from "../models/user.js";
import Mood from "../models/mood.js";
import { verifyToken } from "../middleware/verify-token.js";

router.get("/", verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(403).json({ err: "Unauthorized" });
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: "User not found." });
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// Update the User's user or password
router.put("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id)
      return res.status(403).json({ message: "Access denied" });

    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.password)
      updates.password = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting the User and its assoicated Moods
router.delete("/:userId", verifyToken, async (req, res) => {
  try {
    if (req.user.id !== req.params.id)
      return res.status(403).json({ message: "Access denied" });

    await Mood.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "Account and associated moods deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
