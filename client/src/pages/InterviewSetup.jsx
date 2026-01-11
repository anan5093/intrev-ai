import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InterviewTypeSelector from "../components/interview/InterviewTypeSelector";
import DifficultySelector from "../components/interview/DifficultySelector";
import { createInterview } from "../services/interviewService";
import { useAuth } from "../context/AuthContext";

export default function InterviewSetup() {
  const [type, setType] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleStart = async () => {
    if (!type || !difficulty) {
      alert("Please select interview type and difficulty");
      return;
    }

    const normalizedType = type.toLowerCase();
    const normalizedDifficulty = difficulty.toLowerCase();

    try {
      // 1️⃣ Create interview in backend
      const interview = await createInterview(normalizedType,
      normalizedDifficulty,
      token);

      // 2️⃣ Navigate WITH interviewId
      navigate(`/interview/session/${interview._id}`, {
        state: {type: normalizedType, difficulty: normalizedDifficulty },
      });
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to start interview");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Interview Setup
        </h2>

        <InterviewTypeSelector
          value={type}
          onChange={setType}
        />

        <DifficultySelector
          value={difficulty}
          onChange={setDifficulty}
        />

        <button
          onClick={handleStart}
          className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
