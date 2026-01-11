import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmail } from "../../services/authService";

export default function EmailLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for new users
    if (confirmPassword && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/");
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {/* Create / Confirm Password */}
      <input
        type="password"
        placeholder="Create password (for new users)"
        className="w-full bg-gray-700 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Hint */}
      <p className="text-xs text-gray-400">
        New user? Fill the “Create password” field to sign up.
      </p>

      {/* Login Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-3 rounded-lg font-semibold disabled:opacity-60"
      >
        {loading ? "Please wait..." : "Login"}
      </button>

    </form>
  );
}
