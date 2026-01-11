import Interview from "../models/Interview.js";

/**
 * Helper: check mock mode
 * Default = true (safe)
 */
const isMockMode = () => process.env.USE_AI_MOCK !== "false";

/**
 * Interview type focus map
 */
const TYPE_CONTEXT = {
  hr: "communication skills, motivation, teamwork, conflict resolution, culture fit",
  technical: "APIs, databases, backend systems, scalability, debugging",
  managerial: "leadership, delegation, decision-making, handling pressure",
  coding: "problem-solving approach, logic explanation, trade-offs (no actual coding)",
};

/**
 * Difficulty definition map
 */
const DIFFICULTY_CONTEXT = {
  easy: "basic concepts, definitions, introductory questions",
  medium: "applied understanding, real-world scenarios, reasoning",
  hard: "edge cases, trade-offs, complex decision making",
};

/**
 * ===============================
 * GENERATE AI QUESTION
 * POST /api/ai/question/:interviewId
 * ===============================
 */
export const generateQuestion = async (req, res) => {
  try {
    const { interviewId } = req.params;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Ownership check
    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const type = interview.interviewType;
    const difficulty = interview.difficulty;

    /* ================= MOCK MODE ================= */
    if (isMockMode()) {
      const mockQuestions = {
        hr: {
          easy: "Tell me about yourself.",
          medium: "Describe a situation where you resolved a conflict in a team.",
          hard: "How would you handle a disagreement with your manager?",
        },
        technical: {
          easy: "What is REST and why is it used?",
          medium: "Explain the difference between REST and GraphQL.",
          hard: "How would you design a scalable API system?",
        },
        managerial: {
          easy: "What makes a good leader?",
          medium: "How do you prioritize tasks for your team?",
          hard: "Describe a time you handled a critical failure as a leader.",
        },
        coding: {
          easy: "How do you approach solving a programming problem?",
          medium: "How do you optimize an inefficient algorithm?",
          hard: "How do you evaluate trade-offs between performance and readability?",
        },
      };

      const question =
        mockQuestions[type]?.[difficulty] ||
        "Describe your professional experience.";

      interview.questions.push({ question });
      await interview.save();

      return res.json({ question });
    }

    /* ================= GROQ MODE (FUTURE) ================= */
    const { default: groq } = await import("../config/groq.js");

    const prompt = `
You are an AI interview bot.

Interview Type: ${type}
Focus Area: ${TYPE_CONTEXT[type]}
Difficulty Level: ${difficulty}
Difficulty Meaning: ${DIFFICULTY_CONTEXT[difficulty]}

Rules:
- Ask ONE interview question
- Match the difficulty strictly
- Do NOT repeat previous questions
- Do NOT include the answer
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const question = completion.choices[0].message.content.trim();

    interview.questions.push({ question });
    await interview.save();

    res.json({ question });
  } catch (error) {
    console.error("Generate Question Error:", error);
    res.status(500).json({ message: "Failed to generate question" });
  }
};

/**
 * ===============================
 * SUBMIT ANSWER + FEEDBACK
 * POST /api/ai/answer/:interviewId
 * ===============================
 */
export const submitAnswer = async (req, res) => {
  try {
    const { interviewId } = req.params;
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ message: "Answer is required" });
    }

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const questionIndex = interview.questions.findIndex(
      (q) => !q.answer
    );

    if (questionIndex === -1) {
      return res.status(400).json({ message: "No pending question found" });
    }

    /* ================= MOCK MODE ================= */
    if (isMockMode()) {
      const feedback =
        "Good understanding. Try adding concrete examples and clearer structure.";
      const score = 7;

      interview.questions[questionIndex].answer = answer;
      interview.questions[questionIndex].feedback = feedback;
      interview.questions[questionIndex].score = score;
      interview.overallScore = score;

      await interview.save();

      return res.json({ feedback, score, overallScore: score });
    }

    /* ================= GROQ MODE (FUTURE) ================= */
    const { default: groq } = await import("../config/groq.js");

    const questionText =
      interview.questions[questionIndex].question;

    const prompt = `
You are an interview evaluator.

Question:
"${questionText}"

Candidate Answer:
"${answer}"

Respond ONLY in JSON:
{
  "feedback": "constructive feedback",
  "score": number (0-10)
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const parsed = JSON.parse(
      completion.choices[0].message.content.trim()
    );

    interview.questions[questionIndex].answer = answer;
    interview.questions[questionIndex].feedback = parsed.feedback;
    interview.questions[questionIndex].score = parsed.score;
    interview.overallScore = parsed.score;

    await interview.save();

    res.json({
      feedback: parsed.feedback,
      score: parsed.score,
      overallScore: parsed.score,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error);
    res.status(500).json({ message: "Failed to evaluate answer" });
  }
};
