import { Router } from "express";
import * as moodController from "../controllers/moods.js";
import { verifyToken } from "../middleware/verify-token.js";
import { verify } from "crypto";

const router = Router();

router.post("/", verifyToken, moodController.createMood);
router.get("/", verifyToken, moodController.getMoods);
router.get("/:moodId", verifyToken, moodController.getMood);
router.put("/:moodId", verifyToken, moodController.updateMood);
router.delete("/:moodId", verifyToken, moodController.deleteMood);

export default router;
