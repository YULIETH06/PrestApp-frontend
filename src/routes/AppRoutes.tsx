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

import CreatePqr from "../pages/pqrs/user/CreatePqr";
import MyPqrs from "../pages/pqrs/user/MyPqrs";
import AdminPqrs from "../pages/pqrs/admin/AdminPqrs";
import AgentPqrs from "../pages/pqrs/agent/AgentPqrs";

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

          {/* PQR */}
          <Route
            path="/dashboard/pqrs/my"
            element={<MyPqrs />}
          />

          <Route
            path="/dashboard/pqrs/create"
            element={<CreatePqr />}
          />

          <Route
            path="/dashboard/pqrs"
            element={<AdminPqrs />}
          />

          <Route
            path="/agent/pqrs"
            element={<AgentPqrs />}
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