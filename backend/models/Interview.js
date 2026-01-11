import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: String,
  answer: String,
  feedback: String,
  score: Number,
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    interviewType: {
      type: String,
      required: true,
      enum: ["technical", "hr", "behavioral"],
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },

    questions: [questionSchema],

    overallScore: Number,

    status: {
      type: String,
      default: "started",
    },

    completedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);
