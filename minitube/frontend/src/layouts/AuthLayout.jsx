import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const AuthLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-bg">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Agar already logged in hai toh home pe bhejo
  return user ? <Navigate to="/" replace /> : (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
