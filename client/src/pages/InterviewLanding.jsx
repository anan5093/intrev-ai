import { useNavigate } from "react-router-dom";

export default function InterviewLandingPage() {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate("/interview/setup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-800 px-4">
      <div className="bg-black/70 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-xl w-full text-center text-white">
        
        {/* App Name */}
        <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
          INTREV<span className="text-indigo-400">-AI</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-300 text-lg mb-8">
          Practice real interviews with AI, voice answers, and smart insights.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleStartInterview}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition w-full"
        >
          Start Interview
        </button>

        {/* Helper Text */}
        <p className="text-sm text-gray-400 mt-6">
          Choose interview type • Answer by voice • Get instant feedback
        </p>
      </div>
    </div>
  );
}
