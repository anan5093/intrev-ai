export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 focus:outline-none";

  const variants = {
    primary: disabled
      ? "bg-slate-600 cursor-not-allowed text-slate-300"
      : "bg-indigo-600 hover:bg-indigo-500 text-white",

    secondary:
      "bg-white/10 border border-white/10 text-slate-200 hover:bg-white/20",

    danger:
      "bg-red-600 hover:bg-red-500 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {leftIcon && <span className="w-4 h-4">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="w-4 h-4">{rightIcon}</span>}
    </button>
  );
}
