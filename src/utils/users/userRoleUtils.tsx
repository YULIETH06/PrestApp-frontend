import type { ChipProps } from "@mui/material";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import type { UserRole } from "../../interfaces/users/user.interface";

// Define el color visual del rol del usuario
export const getUserRoleColor = (role: UserRole): ChipProps["color"] => {
  if (role === "ADMIN") return "error";

  return "primary";
};

// Retorna el ícono correspondiente según el rol del usuario
export const getUserRoleIcon = (role: UserRole) => {
  if (role === "ADMIN") return <AdminPanelSettingsOutlinedIcon />;

  return <PersonOutlineOutlinedIcon />;
};

// Convierte el rol técnico en un texto más claro para mostrar
export const getUserRoleLabel = (role: UserRole) => {
  if (role === "ADMIN") return "Administrador";

  return "Usuario";
};