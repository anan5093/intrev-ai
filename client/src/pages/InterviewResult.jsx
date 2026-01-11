import ScoreCard from "../components/dashboard/ScoreCard";
import ConfidenceMeter from "../components/dashboard/ConfidenceMeter";
import SkillBreakdown from "../components/dashboard/SkillBreakdown";
import AIInsights from "../components/dashboard/AIInsights";

export default function InterviewResult() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Interview Results
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <ScoreCard />
          <ConfidenceMeter />
        </div>

        <SkillBreakdown />
        <AIInsights />
      </div>
    </div>
  );
}
