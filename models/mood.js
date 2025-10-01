import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
});

const moodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    emotion: {
      type: String,
      enum: [
        "happy",
        "sad",
        "anxious",
        "scared",
        "disgusted",
        "surprised",
        "angry",
      ],
      required: true,
    },
    physical: {
      type: String,
      required: true,
    },
    intensity: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    timeOfEmotion: {
      type: Date,
      required: true,
    },
    comments: commentSchema,
  },
  { timestamps: true }
);

const Mood = mongoose.model("Mood", moodSchema);

export default Mood;
