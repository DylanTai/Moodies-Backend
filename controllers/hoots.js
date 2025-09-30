// controllers/hoots.js
import { Router } from "express";
import Hoot from "../models/hoot.js";

// POST - create - "/hoots"
export const createHoot = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.create(req.body);
    // hoot._doc.author = req.user;
    res.status(201).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - index - "/hoots"
export const getHoots = async (req, res) => {
  try {
    const hoots = await Hoot.find({})
      .populate("author")
      .sort({ createdAt: "desc" });
    res.status(200).json(hoots);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// GET - show - "/hoots/:hootId"
export const getHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId).populate("author");
    res.status(200).json(hoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// PUT - update - "/hoots/:hootId"
export const updateHoot = async (req, res) => {
  try {
    // Find the hoot:
    const hoot = await Hoot.findById(req.params.hootId);

    // Check permissions:
    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update hoot:
    const updatedHoot = await Hoot.findByIdAndUpdate(
      req.params.hootId,
      req.body,
      { new: true }
    );

    // Append req.user to the author property:
    updatedHoot._doc.author = req.user;

    // Issue JSON response:
    res.status(200).json(updatedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// DELETE - delete - "/hoots/:hootId"
export const deleteHoot = async (req, res) => {
  try {
    const hoot = await Hoot.findById(req.params.hootId);

    if (!hoot.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedHoot = await Hoot.findByIdAndDelete(req.params.hootId);
    res.status(200).json(deletedHoot);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// POST "/hoots/:hootId/comments"
export const postComment = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const hoot = await Hoot.findById(req.params.hootId);
    hoot.comments.push(req.body);
    await hoot.save();

    // Find the newly created comment:
    const newComment = hoot.comments[hoot.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
