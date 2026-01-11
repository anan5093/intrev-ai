const INTERVIEW_TYPES = [
  {
    label: "HR Interview",
    value: "hr",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M16 11c1.66 0 3-1.79 3-4s-1.34-4-3-4-3 1.79-3 4 1.34 4 3 4z" />
        <path d="M8 11c1.66 0 3-1.79 3-4S9.66 3 8 3 5 4.79 5 7s1.34 4 3 4z" />
        <path d="M2 21v-2c0-2 4-3 6-3" />
        <path d="M22 21v-2c0-2-4-3-6-3" />
      </svg>
    ),
  },
  {
    label: "Technical Screening",
    value: "technical",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M4 6h16" />
        <path d="M4 10h16" />
        <path d="M4 14h16" />
        <path d="M4 18h16" />
      </svg>
    ),
  },
  {
    label: "Coding Round",
    value: "coding", // showcase only
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    ),
  },
  {
    label: "Managerial Interview",
    value: "managerial",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
        <path d="M6 20v-2c0-2.21 3.58-4 6-4s6 1.79 6 4v2" />
      </svg>
    ),
  },
];

export default function InterviewTypeSelector({ value, onChange }) {
  return (
    <div>
      <h2 className="text-lg font-medium mb-1">Select Interview Round</h2>
      <p className="text-sm text-slate-400 mb-4">
        Choose the interview round you want to practice
      </p>

      <div className="grid grid-cols-2 gap-4">
        {INTERVIEW_TYPES.map(({ label, value: typeValue, icon }) => {
          const selected = value === typeValue;

          return (
            <button
              key={typeValue}
              type="button"
              onClick={() => onChange(typeValue)} // 👈 canonical value only
              className={`flex items-center gap-3 rounded-xl py-4 px-4 text-sm border transition-all
                ${
                  selected
                    ? "bg-indigo-600/20 border-indigo-400 text-indigo-300 scale-[1.02]"
                    : "bg-white/5 border-white/10 text-slate-200 hover:border-indigo-300"
                }`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
