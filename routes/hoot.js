import { Router } from "express";
import * as hootController from "../controllers/hoots.js";
import { verifyToken } from "../middleware/verify-token.js";
import { verify } from "crypto";

const router = Router();

router.post("/", verifyToken, hootController.createHoot);
router.get("/", verifyToken, hootController.getHoots);
router.get("/:hootId", verifyToken, hootController.getHoot);
router.put("/:hootId", verifyToken, hootController.updateHoot);
router.delete("/:hootId", verifyToken, hootController.deleteHoot);
router.post("/:hootId", verifyToken, hootController.postComment);

export default router;
