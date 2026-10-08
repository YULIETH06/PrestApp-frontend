import {
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import LoanSimulator from "../pages/LoanSimulator";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import DashboardLayout from "../components/layouts/DashboardLayout";

import AdminUsers from "../pages/users/AdminUsers";
import ChangePassword from "../pages/users/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas disponibles solo sin autenticación */}
      <Route element={<PublicRoute />}>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Route>

      {/* Rutas disponibles solo con autenticación */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Préstamos */}
          <Route
            path="/dashboard/loans/simulator"
            element={<LoanSimulator />}
          />

          {/* Usuarios */}
          <Route
            path="/users"
            element={<AdminUsers />}
          />

          <Route
            path="/change-password"
            element={<ChangePassword />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;