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
            roles: ["USER", "ADMIN"],
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