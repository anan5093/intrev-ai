import EmailLoginForm from "../components/auth/EmailLoginForm";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full items-center">
        
        {/* LEFT: BRANDING */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-5xl font-extrabold tracking-wide mb-4">
            INTREV<span className="text-indigo-400">-AI</span>
          </h1>

          <p className="text-xl text-gray-300 animate-pulse">
            Practice. Analyze. Get Hired.
          </p>

          <p className="mt-6 text-gray-400 max-w-md">
            Experience AI-powered mock interviews with real-time
            feedback, voice-based answers, and performance insights.
          </p>
        </div>

        {/* RIGHT: LOGIN CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto">
          
          <h2 className="text-2xl font-bold mb-2 text-center">
            Login or Signup to <span className="text-indigo-600">Intrev-AI</span>
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">
            Start your AI interview journey
          </p>

          <EmailLoginForm />

          <div className="my-5 flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <GoogleLoginButton />
        </div>

      </div>
    </div>
  );
}
