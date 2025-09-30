// controllers/moods.js
import { Router } from "express";
import Mood from "../models/mood.js";

// POST - create - "/moods"
export const createMood = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const mood = await Mood.create(req.body);
    // mood._doc.author = req.user;
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - index - "/moods"
export const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(moods);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - show - "/moods/:moodId"
export const getMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.moodId).populate("author");
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
    if (!mood.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update mood:
    const updatedMood = await Mood.findByIdAndUpdate(
      req.params.moodId,
      req.body,
      { new: true }
    );

    // Append req.user to the author property:
    updatedMood._doc.author = req.user;

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

    if (!mood.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedMood = await Mood.findByIdAndDelete(req.params.moodId);
    res.status(200).json(deletedMood);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// POST "/moods/:moodId/comments"
export const postComment = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const mood = await Mood.findById(req.params.moodId);
    mood.comments.push(req.body);
    await mood.save();

    // Find the newly created comment:
    const newComment = mood.comments[mood.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
