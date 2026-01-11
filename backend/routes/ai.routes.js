import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  generateQuestion,
  submitAnswer,
} from "../controllers/ai.controller.js";

const router = express.Router();

/**
 * POST /api/ai/question/:interviewId
 */
router.post("/question/:interviewId", protect, generateQuestion);

/**
 * POST /api/ai/answer/:interviewId
 */
router.post("/answer/:interviewId", protect, submitAnswer);

export default router;
