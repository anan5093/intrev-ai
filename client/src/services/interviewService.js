import axios from "axios";

const API = "http://localhost:5000/api";

/**
 * 1️⃣ Create interview (called from InterviewSetup)
 */
export const createInterview = async (type, difficulty, token) => {
  const res = await axios.post(
    `${API}/interviews`,
    { type, difficulty },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

/**
 * 2️⃣ Get AI question
 */
export const getQuestion = async (interviewId, token) => {
  const res = await axios.post(
    `${API}/ai/question/${interviewId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.question;
};

/**
 * 3️⃣ Submit answer
 */
export const submitAnswer = async (interviewId, answer, token) => {
  const res = await axios.post(
    `${API}/ai/answer/${interviewId}`,
    { answer },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};

/**
 * 4️⃣ Complete interview
 */
export const completeInterview = async (interviewId, token) => {
  const res = await axios.post(
    `${API}/interviews/${interviewId}/complete`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
