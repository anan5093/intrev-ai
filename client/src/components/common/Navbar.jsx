import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-black/60 backdrop-blur-md text-white">
      
      {/* Brand */}
      <div
        className="text-xl font-extrabold cursor-pointer"
        onClick={() => navigate("/")}
      >
        INTREV<span className="text-indigo-400">-AI</span>
      </div>

      {/* Actions */}
      <button
        onClick={handleLogout}
        className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded-lg font-medium"
      >
        Logout
      </button>
    </nav>
  );
}
