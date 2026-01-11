export default function InterviewProgress() {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>Question 1 of 5</span>
        <span>Progress</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div className="bg-black h-2 rounded w-1/5"></div>
      </div>
    </div>
  );
}
