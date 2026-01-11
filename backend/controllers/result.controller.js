import Interview from "../models/Interview.js";

export const getInterviewResult = async (req, res) => {
  const interview = await Interview.findById(req.params.interviewId);

  if (!interview) {
    return res.status(404).json({ message: "Interview not found" });
  }

  if (interview.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const strengths = [];
  const weaknesses = [];

  interview.questions.forEach((q) => {
    if (q.score >= 7) strengths.push("Concept clarity");
    if (q.score <= 4) weaknesses.push("Needs improvement");
  });

  res.json({
    interviewType: interview.interviewType,
    difficulty: interview.difficulty,
    overallScore: interview.overallScore,
    strengths: [...new Set(strengths)],
    weaknesses: [...new Set(weaknesses)],
    questions: interview.questions,
  });
};

export const getMyResults = async (req, res) => {
  const interviews = await Interview.find({ user: req.user._id })
    .select("interviewType difficulty overallScore status createdAt")
    .sort({ createdAt: -1 });

  res.json(interviews);
};
