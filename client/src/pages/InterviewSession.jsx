import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import AIQuestionCard from "../components/interview/AIQuestionCard";
import VoiceRecorder from "../components/interview/VoiceRecorder";
import InterviewProgress from "../components/interview/InterviewProgress";

import { transcribeSpeech } from "../services/speechService";
import {
  getQuestion,
  submitAnswer,
  completeInterview,
} from "../services/interviewService";

import { useAuth } from "../context/AuthContext";

export default function InterviewSession() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { interviewId } = useParams();
  const { token } = useAuth();

  const interviewType = state?.type || "technical";
  const difficulty = state?.difficulty || "medium";

  const [question, setQuestion] = useState("");
  const [audioBlob, setAudioBlob] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  /* ===== Fetch first question ===== */
  useEffect(() => {
  if (!interviewId) return;

  async function loadQuestion() {
    try {
      const q = await getQuestion(interviewId, token);
      setQuestion(q);
    } catch (err) {
      console.error("Failed to load question", err);
    }
  }

  loadQuestion();
}, [interviewId, token]);


  /* ===== Handle voice recording end ===== */
  const handleAudioStop = async (blob) => {
    setLoading(true);
    setAudioBlob(blob);

    const text = await transcribeSpeech(blob, token);
    setAnswer(text);

    setLoading(false);
  };

  /* ===== Submit answer ===== */
  const handleSubmitAnswer = async () => {
    if (!answer) return;

    setLoading(true);

    await submitAnswer(interviewId, answer, token);

    setAnswer("");
    setAudioBlob(null);

    const nextQ = await getQuestion(interviewId, token);
    setQuestion(nextQ);

    setLoading(false);
  };

  /* ===== Finish interview ===== */
  const handleFinish = async () => {
    await completeInterview(interviewId, token);
    navigate(`/interview/result/${interviewId}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <InterviewProgress />

        <AIQuestionCard
          question={question}
          type={interviewType}
          difficulty={difficulty}
        />

        <VoiceRecorder onStop={handleAudioStop} />

        {loading && (
          <p className="text-center mt-4 text-gray-500">
            Processing...
          </p>
        )}

        {answer && !loading && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              <b>Your Answer:</b> {answer}
            </p>

            <button
              onClick={handleSubmitAnswer}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Submit Answer
            </button>
          </div>
        )}

        <button
          onClick={handleFinish}
          className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800"
        >
          Finish Interview
        </button>
      </div>
    </div>
  );
}
