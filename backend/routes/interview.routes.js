import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createInterview,
  getInterviewById,
  completeInterview,
} from "../controllers/interview.controller.js";

const router = express.Router();

router.post("/", protect, createInterview);
router.get("/:id", protect, getInterviewById);
router.post("/:id/complete", protect, completeInterview);

export default router;
