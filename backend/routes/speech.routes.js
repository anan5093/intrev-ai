import express from "express";
import protect from "../middleware/auth.middleware.js";
import upload from "../config/multer.js";
import { transcribeAudio } from "../controllers/speech.controller.js";

const router = express.Router();

router.post(
  "/transcribe",
  protect,
  upload.single("audio"),
  transcribeAudio
);

export default router;
