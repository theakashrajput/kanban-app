import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../components/Register";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import { verifyMe } from "../api/auth.api";

const MainRoutes = () => {

  const [loading, setLoading] = useState(true);
  const { user, loggedInUser, clearState } = useAuth();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await verifyMe();
        if (!isMounted) return;

        if (res && res.success && res.data) {
          loggedInUser(res.data);
        } else {
          clearState();
        }
      } catch (error) {
        if (!isMounted) return;
        console.log("User not authenticated");
        clearState();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="h-screen w-full bg-zinc-800 text-white flex items-center justify-center text-2xl">
      Loading...
    </div>
  }

  return (
    <Routes>
      <Route path="/auth/register" element={<Register />} />

      <Route path="/auth/login" element={!user ? <Login /> : <Navigate to="/" replace={true} />} />
      <Route path="/" element={user ? <Dashboard /> : <Navigate to="auth/login" replace={true} />} />
    </Routes>
  );
};

export default MainRoutes;
