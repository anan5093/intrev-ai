import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/common/Loader";

// 1️⃣ Create Context
const AuthContext = createContext(null);

// 2️⃣ Provider
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3️⃣ Check token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // 4️⃣ Login
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // 5️⃣ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // 6️⃣ Shared values
  const value = {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };

  // 7️⃣ Show loader while checking auth
  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 8️⃣ Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
