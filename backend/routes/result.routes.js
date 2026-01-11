import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getInterviewResult,
  getMyResults,
} from "../controllers/result.controller.js";

const router = express.Router();

router.get("/my", protect, getMyResults);
router.get("/:interviewId", protect, getInterviewResult);

export default router;
