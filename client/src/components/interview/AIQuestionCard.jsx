export default function AIQuestionCard({ question, type, difficulty, loading }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        AI Question
      </h2>

      <div className="bg-slate-50 p-4 rounded-lg min-h-[90px]">
        {/* Meta */}
        <p className="text-xs text-gray-400 mb-2">
          {type} • {difficulty}
        </p>

        {/* Question */}
        {loading ? (
          <p className="text-gray-400 italic animate-pulse">
            AI is thinking...
          </p>
        ) : question ? (
          <p className="text-gray-800">
            {question}
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Waiting for AI question...
          </p>
        )}
      </div>
    </div>
  );
}
