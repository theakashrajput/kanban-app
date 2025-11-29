import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AuthPage from "../pages/AuthPage";
import Nav from "../components/Nav";

const MainRoutes = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
