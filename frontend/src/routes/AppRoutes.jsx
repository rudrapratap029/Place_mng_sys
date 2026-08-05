import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Students from "../pages/students/Students";
import Companies from "../pages/companies/Companies";
import Applications from "../pages/applications/Applications";
import NotFound from "../pages/NotFound";

import MainLayout from "../components/layout/MainLayout";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/applications"
          element={<Applications />}
        />

      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default AppRoutes;