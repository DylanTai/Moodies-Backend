// controllers/moods.js
import { Router } from "express";
import Mood from "../models/mood.js";

// POST - create - "/moods"
export const createMood = async (req, res) => {
  try {
    console.log("Body: ", req.body);
    console.log("User: ", req.user);
    req.body.user = req.user._id;
    const mood = await Mood.create(req.body);
    //mood._doc.user = req.user;
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - index - "/moods"
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ user: req.user._id })
      .populate("user")
      .sort({ createdAt: "desc" });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - show - "/moods/:moodId"
export const getMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.moodId).populate("user");
    res.status(200).json(mood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// PUT - update - "/moods/:moodId"
export const updateMood = async (req, res) => {
  try {
    // Find the mood:
    const mood = await Mood.findById(req.params.moodId);

    // Check permissions:
    if (!mood.user.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update mood:
    const updatedMood = await Mood.findByIdAndUpdate(
      req.params.moodId,
      req.body,
      { new: true }
    );

    // Append req.user to the author property:
    updatedMood._doc.user = req.user;

    // Issue JSON response:
    res.status(200).json(updatedMood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// DELETE - delete - "/moods/:moodId"
export const deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.moodId);

    if (!mood.user.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedMood = await Mood.findByIdAndDelete(req.params.moodId);
    res.status(200).json(deletedMood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
