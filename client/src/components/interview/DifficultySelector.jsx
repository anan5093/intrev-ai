const LEVELS = [
  {
    label: "Easy",
    value: "easy",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 20V10" />
        <path d="M9 13l3-3 3 3" />
      </svg>
    ),
  },
  {
    label: "Medium",
    value: "medium",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 12h12" />
      </svg>
    ),
  },
  {
    label: "Hard",
    value: "hard",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 4v16" />
        <path d="M6 12h12" />
      </svg>
    ),
  },
];

export default function DifficultySelector({ value, onChange }) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-1">Select Difficulty Level</h2>
      <p className="text-sm text-slate-400 mb-4">
        Difficulty affects question depth and evaluation strictness
      </p>

      <div className="flex gap-3">
        {LEVELS.map((level) => {
          const selected = value === level.value;

          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onChange(level.value)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm border transition-all
                ${
                  selected
                    ? "bg-indigo-600/20 border-indigo-400 text-indigo-300"
                    : "bg-white/5 border-white/10 text-slate-200 hover:border-indigo-300"
                }`}
            >
              {level.icon}
              {level.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
