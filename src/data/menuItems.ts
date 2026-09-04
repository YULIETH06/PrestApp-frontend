export interface MenuOption {
  label: string;
  path: string;
  roles: string[];
}

export interface MenuSubmodule {
  name: string;
  options: MenuOption[];
}

export interface MenuModule {
  module: string;
  submodules: MenuSubmodule[];
}

export const menuItems: MenuModule[] = [
  {
    module: "Préstamos",
    submodules: [
      {
        name: "Herramientas",
        options: [
          {
            label: "Simulador de préstamos",
            path: "/dashboard/loans/simulator",
            roles: ["USER", "AGENT", "ADMIN"],
          },
        ],
      },
    ],
  },

  {
    module: "PQR",
    submodules: [
      {
        name: "Mis solicitudes PQR",
        options: [
          {
            label: "Ver mis PQR",
            path: "/dashboard/pqrs/my",
            roles: ["USER", "AGENT"],
          },
          {
            label: "Crear nueva PQR",
            path: "/dashboard/pqrs/create",
            roles: ["USER", "AGENT"],
          },
        ],
      },
      {
        name: "Atención de solicitudes PQR",
        options: [
          {
            label: "PQR asignadas",
            path: "/agent/pqrs",
            roles: ["AGENT"],
          },
        ],
      },
      {
        name: "Administración de PQR",
        options: [
          {
            label: "Todas las PQR",
            path: "/dashboard/pqrs",
            roles: ["ADMIN"],
          },
        ],
      },
    ],
  },

  {
    module: "Usuarios",
    submodules: [
      {
        name: "Gestión de usuarios",
        options: [
          {
            label: "Administrar usuarios",
            path: "/users",
            roles: ["ADMIN"],
          },
        ],
      },
    ],
  },
];