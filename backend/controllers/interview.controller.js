import Interview from "../models/Interview.js";

/**
 * Create Interview
 * POST /api/interviews
 */
export const createInterview = async (req, res) => {
  try {
    const { type, difficulty } = req.body;

    if (!type || !difficulty) {
      return res
        .status(400)
        .json({ message: "Type and difficulty are required" });
    }

    const interview = await Interview.create({
      user: req.user._id,
      interviewType: type, // ✅ FIXED
      difficulty,
      status: "started",
    });

    res.status(201).json(interview);
  } catch (error) {
    console.error("Create Interview Error:", error);
    res.status(500).json({ message: "Failed to create interview" });
  }
};

/**
 * Get Interview by ID
 * GET /api/interviews/:id
 */
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // 🔐 Ownership check (important)
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json(interview);
  } catch (error) {
    console.error("Get Interview Error:", error);
    res.status(500).json({ message: "Failed to fetch interview" });
  }
};

/**
 * Complete Interview
 * POST /api/interviews/:id/complete
 */
export const completeInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // 🔐 Ownership check
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    interview.status = "completed";
    interview.completedAt = new Date();

    await interview.save();

    res.json({
      message: "Interview completed successfully",
      interview,
    });
  } catch (error) {
    console.error("Complete Interview Error:", error);
    res.status(500).json({ message: "Failed to complete interview" });
  }
};
