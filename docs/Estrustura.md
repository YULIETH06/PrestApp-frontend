# Documentación de la estructura del proyecto frontend — Presta App

## 1. Descripción general

El frontend de **Presta App** está desarrollado con **React**, **TypeScript**, **Vite**, **Material UI**, **React Router DOM**, **Axios** y **Socket.IO Client**.

La estructura del proyecto está organizada de forma modular para separar responsabilidades, facilitar el mantenimiento y permitir la reutilización de componentes.

| Módulo | Responsabilidad principal |
| --- | --- |
| Préstamos | Simular préstamos y presentar los resultados del cálculo. |
| PQR | Crear, consultar, atender, asignar, chatear, adjuntar archivos y calificar solicitudes. |
| Usuarios | Administrar usuarios, roles, contraseñas y cargas masivas. |
| Autenticación | Registro, login, sesión JWT, perfil y cambio de contraseña. |
| Notificaciones | Consultar, marcar como leídas y recibir notificaciones en tiempo real. |

| Capa | Responsabilidad |
| --- | --- |
| `pages` | Construir las vistas completas. |
| `components` | Representar elementos visuales reutilizables o específicos. |
| `hooks` | Administrar estado, validaciones, carga, errores y acciones. |
| `services` | Comunicarse con el backend y Socket.IO. |
| `interfaces` | Definir contratos de datos con TypeScript. |
| `validations` | Centralizar reglas de validación. |
| `utils` | Contener funciones auxiliares reutilizables. |
| `data` | Mantener datos y listas estáticas. |
| `styles` | Centralizar estilos compartidos. |
| `theme` | Definir la identidad visual de Material UI. |
| `template` | Generar plantillas descargables. |
| `icons` | Centralizar íconos reutilizables. |

---

## 2. Estructura principal

```txt
public/
│
└── assets/
│
src/
│
├── api/
├── components/
├── context/
├── data/
├── hooks/
├── icons/
├── interfaces/
├── pages/
├── routes/
├── services/
├── styles/
├── template/
├── theme/
├── utils/
├── validations/
│
├── App.tsx
└── main.tsx
```

| Carpeta / archivo | Descripción |
| --- | --- |
| `public/` | Recursos estáticos públicos. |
| `src/api/` | Configuración base de Axios. |
| `src/components/` | Componentes visuales. |
| `src/context/` | Estado global. |
| `src/data/` | Datos estáticos. |
| `src/hooks/` | Lógica de estado y acciones. |
| `src/icons/` | Catálogo de íconos. |
| `src/interfaces/` | Tipos e interfaces TypeScript. |
| `src/pages/` | Vistas completas. |
| `src/routes/` | Configuración y protección de rutas. |
| `src/services/` | Comunicación HTTP y Socket.IO. |
| `src/styles/` | Estilos reutilizables. |
| `src/template/` | Plantillas descargables. |
| `src/theme/` | Tema global de Material UI. |
| `src/utils/` | Funciones auxiliares. |
| `src/validations/` | Esquemas de validación. |
| `App.tsx` | Componente base. |
| `main.tsx` | Punto de entrada. |

---

# 3. `public/`

```txt
public/
└── assets/
    ├── logo.png
    ├── logo-blanco.png
    ├── logo-icono.png
    ├── logo-blanco-icono.png
    └── logo-icono-web.png
```

| Archivo / carpeta | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `assets/` | Contiene los recursos gráficos públicos. | Logos e íconos de marca. |
| `logo.png` | Logo principal. | Fondos claros. |
| `logo-blanco.png` | Logo principal en blanco. | Fondos oscuros. |
| `logo-icono.png` | Logo compacto. | Menús o espacios reducidos. |
| `logo-blanco-icono.png` | Logo compacto blanco. | Fondos oscuros. |
| `logo-icono-web.png` | Ícono web. | Identidad visual. |

---

# 4. `src/api/`

```txt
api/
└── axios.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `axios.ts` | Centraliza la instancia de Axios, la URL base y la configuración de autenticación mediante JWT. | Es utilizado por los servicios HTTP de la aplicación. |

| Responsabilidad | Descripción |
| --- | --- |
| URL base | Define la dirección común del backend. |
| Token JWT | Adjunta el token cuando existe una sesión autenticada. |
| Configuración | Evita repetir opciones HTTP en cada servicio. |
| Reutilización | Permite que todos los módulos usen la misma instancia Axios. |

---

# 5. `src/components/`

```txt
components/
│
├── common/
│   ├── ActionButton.tsx
│   ├── BulkUploadDialog.tsx
│   ├── ClearableSelect.tsx
│   ├── ConfirmActionDialog.tsx
│   ├── CustomAccordion.tsx
│   ├── CustomChip.tsx
│   ├── CustomDialog.tsx
│   ├── CustomSnackbar.tsx
│   ├── DataTable.tsx
│   ├── EmptyState.tsx
│   ├── FormGrid.tsx
│   ├── FormSection.tsx
│   ├── IconActionButton.tsx
│   ├── InfoItem.tsx
│   ├── InfoTooltip.tsx
│   ├── ListToolbar.tsx
│   ├── LoadingBox.tsx
│   ├── NotificationBell.tsx
│   ├── PageContainer.tsx
│   ├── PageHeader.tsx
│   ├── ProcessStepper.tsx
│   ├── RadioOptionGroup.tsx
│   ├── SectionCard.tsx
│   ├── StatsSummary.tsx
│   ├── ViewToggleButtons.tsx
│   └── inputs/
│       ├── DateInput.tsx
│       ├── FileInput.tsx
│       ├── MoneyInput.tsx
│       ├── NumberInput.tsx
│       ├── PasswordInput.tsx
│       ├── TextAreaInput.tsx
│       └── TextInput.tsx
│
├── layouts/
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── SidebarMenu.tsx
│
├── loans/
│   └── LoanSummaryCard.tsx
│
├── pqrs/
│   ├── PqrAttachmentPreviewDialog.tsx
│   ├── PqrChatView.tsx
│   ├── PqrRatingSummary.tsx
│   └── PqrTicketCard.tsx
│
└── users/
    ├── ChangeUserPasswordDialog.tsx
    ├── ChangeUserRoleDialog.tsx
    ├── SettingsMenu.tsx
    └── UserRoleChip.tsx
```

## 5.1. `components/common/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `ActionButton.tsx` | Botón reutilizable para acciones principales. Centraliza íconos semánticos, variantes, tooltip y estado de carga. | Formularios, diálogos, listados, préstamos, PQR y usuarios. |
| `BulkUploadDialog.tsx` | Diálogo reutilizable para carga masiva de archivos. | Carga masiva de usuarios. |
| `ClearableSelect.tsx` | Selector reutilizable que permite elegir y limpiar una opción. | Filtros, PQR y simulador de préstamos. |
| `ConfirmActionDialog.tsx` | Diálogo para confirmar acciones importantes. | Operaciones que requieren confirmación previa. |
| `CustomAccordion.tsx` | Contenido expandible basado en `Accordion`. | Información agrupada. |
| `CustomChip.tsx` | Etiqueta visual para estados, roles, prioridades o categorías. | PQR y usuarios. |
| `CustomDialog.tsx` | Estructura base de los diálogos. | Formularios y vistas modales. |
| `CustomSnackbar.tsx` | Muestra mensajes temporales de éxito, error, advertencia o información. | Retroalimentación visual. |
| `DataTable.tsx` | Tabla reutilizable configurable mediante filas, columnas y acciones. | Administración de usuarios y listados. |
| `EmptyState.tsx` | Estado visual para resultados vacíos. | PQR, usuarios y búsquedas. |
| `FormGrid.tsx` | Organiza campos mediante CSS Grid responsivo. | Formularios. |
| `FormSection.tsx` | Agrupa campos relacionados dentro de una sección visual. | Formularios extensos. |
| `IconActionButton.tsx` | Botón compacto de ícono basado en `appIcons.ts`. | Acciones secundarias. |
| `InfoItem.tsx` | Presenta etiqueta y valor cuando existe información. | Detalles y resúmenes. |
| `InfoTooltip.tsx` | Muestra información adicional en un panel flotante. | Ayudas y aclaraciones. |
| `ListToolbar.tsx` | Centraliza búsqueda, filtros, actualización y acciones de listados. | `AdminUsers`, `AdminPqrs`, `AgentPqrs` y `MyPqrs`. |
| `LoadingBox.tsx` | Indicador de carga centrado. | Consultas asíncronas. |
| `NotificationBell.tsx` | Campana, contador y listado de notificaciones. | `Header.tsx`. |
| `PageContainer.tsx` | Contenedor general de páginas. | Vistas internas. |
| `PageHeader.tsx` | Encabezado reutilizable con título, subtítulo y acciones. | Préstamos, PQR y usuarios. |
| `ProcessStepper.tsx` | Representa procesos por etapas. | Flujos secuenciales. |
| `RadioOptionGroup.tsx` | Selección exclusiva mediante radio buttons. | Formularios. |
| `SectionCard.tsx` | Tarjeta para agrupar contenido con encabezado. | Simulador y secciones informativas. |
| `StatsSummary.tsx` | Tarjetas de resumen con etiqueta, ícono y valor. | Indicadores. |
| `ViewToggleButtons.tsx` | Alterna entre vistas o categorías. | Listados con secciones. |

## 5.2. `components/common/inputs/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `DateInput.tsx` | Campo reutilizable para fechas. | Filtros y formularios. |
| `FileInput.tsx` | Selección y presentación de archivos. | Adjuntos y cargas. |
| `MoneyInput.tsx` | Captura montos, limpia caracteres y aplica formato numérico. Acepta `string | number`. | Simulador de préstamos. |
| `NumberInput.tsx` | Captura números enteros y elimina caracteres no numéricos. Acepta `string | number`. | Tasa, plazo y valores numéricos. |
| `PasswordInput.tsx` | Captura contraseña y permite mostrar u ocultar el valor. | Login, registro y contraseñas. |
| `TextAreaInput.tsx` | Captura texto multilinea. | Descripciones y comentarios. |
| `TextInput.tsx` | Captura texto de una sola línea. | Formularios generales. |

## 5.3. `components/layouts/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `DashboardLayout.tsx` | Define la estructura general de las páginas privadas. | Envuelve las rutas autenticadas. |
| `Header.tsx` | Encabezado con usuario, notificaciones y configuración. | Dentro de `DashboardLayout.tsx`. |
| `SidebarMenu.tsx` | Construye el menú lateral y filtra opciones por rol. | Navegación principal. |

## 5.4. `components/loans/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `LoanSummaryCard.tsx` | Presenta el resultado generado por el simulador: monto, intereses, períodos, total, cuotas y valor por cuota. | `LoanSimulator.tsx`. |

## 5.5. `components/pqrs/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `PqrAttachmentPreviewDialog.tsx` | Vista ampliada de imágenes adjuntas. | `PqrChatView.tsx`. |
| `PqrChatView.tsx` | Presenta mensajes, adjuntos, campo de escritura y acciones del chat. | Chat de PQR. |
| `PqrRatingSummary.tsx` | Presenta calificación, comentario y fecha. | PQR calificadas. |
| `PqrTicketCard.tsx` | Tarjeta reutilizable con información, estado, prioridad, responsable, calificación, mensajes pendientes y acciones. | Vistas PQR por rol. |

## 5.6. `components/users/`

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `ChangeUserPasswordDialog.tsx` | Diálogo para restablecer la contraseña de un usuario. | `AdminUsers.tsx`. |
| `ChangeUserRoleDialog.tsx` | Diálogo para cambiar el rol. | `AdminUsers.tsx`. |
| `SettingsMenu.tsx` | Menú de configuración personal. | `Header.tsx`. |
| `UserRoleChip.tsx` | Representa visualmente el rol. | Listados de usuarios. |

---

# 6. `src/context/`

```txt
context/
└── AuthContext.tsx
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `AuthContext.tsx` | Maneja usuario autenticado, token, perfil, login, logout y conexión global con Socket.IO. | Rutas, páginas, layout y componentes autenticados. |

| Responsabilidad | Descripción |
| --- | --- |
| Usuario | Mantiene `AuthUser` en estado global. |
| Token | Guarda y elimina JWT. |
| Perfil | Consulta la sesión activa. |
| Login | Actualiza el contexto al autenticar. |
| Logout | Limpia sesión y almacenamiento. |
| Socket.IO | Conecta al iniciar sesión y desconecta al cerrar sesión. |

---

# 7. `src/data/`

```txt
data/
├── appBrand.ts
├── loanOptions.ts
├── menuItems.ts
├── pqrOptions.ts
└── userRoles.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `appBrand.ts` | Centraliza nombre, logos y textos alternativos. | Identidad visual. |
| `loanOptions.ts` | Define frecuencias y unidades del simulador. | `LoanSimulator.tsx`. |
| `menuItems.ts` | Define módulos, opciones, rutas y roles del menú. | `SidebarMenu.tsx`. |
| `pqrOptions.ts` | Define tipos de caso, estados y prioridades. | Formularios y filtros PQR. |
| `userRoles.ts` | Define roles disponibles. | Administración de usuarios. |

## Opciones del menú

| Módulo | Opción | Ruta | Roles |
| --- | --- | --- | --- |
| Préstamos | Simulador de préstamos | `/dashboard/loans/simulator` | USER / AGENT / ADMIN |
| PQR | Ver mis PQR | `/dashboard/pqrs/my` | USER / AGENT |
| PQR | Crear nueva PQR | `/dashboard/pqrs/create` | USER / AGENT |
| PQR | PQR asignadas | `/agent/pqrs` | AGENT |
| PQR | Todas las PQR | `/dashboard/pqrs` | ADMIN |
| Usuarios | Administrar usuarios | `/users` | ADMIN |

---

# 8. `src/hooks/`

```txt
hooks/
│
├── auth/
│   ├── useChangePassword.ts
│   ├── useLogin.ts
│   └── useRegister.ts
│
├── loans/
│   └── useLoanSimulator.ts
│
├── notifications/
│   └── useNotifications.ts
│
├── pqrs/
│   ├── useAdminPqrs.ts
│   ├── useAgentPqrs.ts
│   ├── useCreatePqr.ts
│   ├── useMyPqrs.ts
│   └── usePqrChat.ts
│
└── users/
    ├── useAdminUsers.ts
    └── useChangeUserPassword.ts
```

| Módulo | Hook | Descripción | Uso dentro del proyecto |
| --- | --- | --- | --- |
| Autenticación | `useLogin.ts` | Maneja campos, validación, carga, errores, autenticación y redirección. | `Login.tsx`. |
| Autenticación | `useRegister.ts` | Maneja campos, validación, envío y mensajes del registro. | `Register.tsx`. |
| Autenticación | `useChangePassword.ts` | Maneja contraseña actual, nueva, confirmación, validación y respuesta. | `ChangePassword.tsx`. |
| Préstamos | `useLoanSimulator.ts` | Maneja formulario, errores, conversión numérica, validación, cálculo, resultado y limpieza. | `LoanSimulator.tsx`. |
| Notificaciones | `useNotifications.ts` | Consulta, cuenta, marca lectura y escucha nuevas notificaciones. | `NotificationBell.tsx`. |
| PQR | `useAdminPqrs.ts` | Consulta, filtros, estado, prioridad, asignación y actualización administrativa. | `AdminPqrs.tsx`. |
| PQR | `useAgentPqrs.ts` | Gestiona PQR disponibles/asignadas, toma de casos y mensajes pendientes. | `AgentPqrs.tsx`. |
| PQR | `useCreatePqr.ts` | Maneja formulario, archivo, validación y creación. | `CreatePqr.tsx`. |
| PQR | `useMyPqrs.ts` | Consulta PQR propias, filtros, chat, calificación y mensajes sin leer. | `MyPqrs.tsx`. |
| PQR | `usePqrChat.ts` | Consulta historial, ingresa a sala, envía mensajes/adjuntos y marca lectura. | `PqrChatView.tsx`. |
| Usuarios | `useAdminUsers.ts` | Consulta, búsqueda, filtros, rol, carga masiva y mensajes. | `AdminUsers.tsx`. |
| Usuarios | `useChangeUserPassword.ts` | Maneja usuario seleccionado, diálogo, contraseña, confirmación, validación y restablecimiento. | `AdminUsers.tsx`. |

## Campos administrados por `useLoanSimulator.ts`

| Campo | Descripción |
| --- | --- |
| `amount` | Monto. |
| `interestRate` | Tasa de interés. |
| `interestFrequency` | Frecuencia del interés. |
| `termValue` | Valor del plazo. |
| `termFrequency` | Unidad del plazo. |
| `paymentFrequency` | Frecuencia de pago. |

---

# 9. `src/icons/`

```txt
icons/
└── appIcons.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `appIcons.ts` | Centraliza la relación entre acciones semánticas e íconos de Material UI. | `ActionButton.tsx`, `IconActionButton.tsx` y componentes que consumen el catálogo. |

| Grupo | Claves |
| --- | --- |
| Acciones | `save`, `edit`, `cancel`, `approve`, `reject`, `delete`, `view`, `hide`, `open`, `create`, `send`, `clear`, `back`, `print` |
| Archivos | `file`, `upload`, `download`, `folderOpen` |
| Configuración | `lock`, `unlock`, `settings`, `signature`, `changePassword` |
| Consulta | `history`, `search`, `filter`, `refresh` |
| Procesos | `assignment`, `pending`, `completed`, `calendar`, `review`, `chat`, `rating`, `play` |

---

# 10. `src/interfaces/`

```txt
interfaces/
│
├── auth/
│   └── auth.interface.ts
│
├── common/
│   ├── identificationType.interface.ts
│   └── message.interface.ts
│
├── loans/
│   └── loan.interface.ts
│
├── notifications/
│   └── notification.interface.ts
│
├── pqrs/
│   └── pqr.interface.ts
│
└── users/
    ├── bulkUpload.interface.ts
    ├── excel.interface.ts
    └── user.interface.ts
```

| Módulo | Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- | --- |
| Autenticación | `auth.interface.ts` | Define login, registro, usuario autenticado, respuestas y cambio de contraseña. | Servicios, hooks, contexto y páginas auth. |
| Common | `identificationType.interface.ts` | Define tipos de identificación y respuesta del catálogo. | `identificationTypeService.ts`. |
| Common | `message.interface.ts` | Define tipos comunes de mensajes visuales. | Hooks y snackbars. |
| Préstamos | `loan.interface.ts` | Define frecuencia, formulario y resultado del simulador. | Página, hook, validación y cálculo. |
| Notificaciones | `notification.interface.ts` | Define notificaciones, respuestas, contador y eventos. | Servicio, hook, campana y sockets. |
| PQR | `pqr.interface.ts` | Define PQR, mensajes, adjuntos, estados, prioridades, calificación y respuestas. | Todo el módulo PQR. |
| Usuarios | `user.interface.ts` | Define usuarios, roles, agentes y operaciones administrativas. | Servicio, hooks y componentes. |
| Usuarios | `bulkUpload.interface.ts` | Define datos y resultados de carga masiva. | Diálogo, hook y servicio. |
| Usuarios | `excel.interface.ts` | Define tipos auxiliares de Excel. | Plantilla y utilidades. |

## Interfaces de autenticación

| Interfaz | Descripción |
| --- | --- |
| `LoginData` | Credenciales de login. |
| `AuthUser` | Usuario autenticado. |
| `LoginResponse` | Mensaje, token y usuario. |
| `ProfileResponse` | Respuesta del perfil. |
| `RegisterData` | Datos de registro. |
| `RegisterResponse` | Respuesta del registro. |
| `LoginFormErrors` | Errores del login. |
| `RegisterFormErrors` | Errores del registro. |
| `ChangePasswordData` | Datos del cambio de contraseña. |
| `ChangePasswordResponse` | Respuesta del cambio. |
| `ChangePasswordFormErrors` | Errores del formulario. |

## Interfaces de préstamos

| Tipo / interfaz | Descripción |
| --- | --- |
| `LoanFrequency` | Frecuencias permitidas. |
| `LoanSimulationForm` | Datos ingresados por el usuario. |
| `LoanSimulationResult` | Datos calculados de la simulación. |

## Interfaces de usuarios

| Archivo | Tipado principal |
| --- | --- |
| `user.interface.ts` | Usuario, rol, agente, cambio de rol, restablecimiento y respuestas. |
| `bulkUpload.interface.ts` | Archivo, filas, resultados y errores de carga masiva. |
| `excel.interface.ts` | Estructuras auxiliares utilizadas con ExcelJS. |

---

# 11. `src/pages/`

```txt
pages/
│
├── Dashboard.tsx
├── LoanSimulator.tsx
│
├── auth/
│   ├── Login.tsx
│   └── Register.tsx
│
├── pqrs/
│   ├── admin/
│   │   └── AdminPqrs.tsx
│   ├── agent/
│   │   └── AgentPqrs.tsx
│   └── user/
│       ├── CreatePqr.tsx
│       └── MyPqrs.tsx
│
└── users/
    ├── AdminUsers.tsx
    └── ChangePassword.tsx
```

| Página | Descripción | Dependencias principales |
| --- | --- | --- |
| `Dashboard.tsx` | Página principal privada. | Layout y componentes generales. |
| `LoanSimulator.tsx` | Formulario y resultado de simulación. | `useLoanSimulator`, inputs, `LoanSummaryCard`. |
| `Login.tsx` | Inicio de sesión. | `useLogin`. |
| `Register.tsx` | Registro. | `useRegister`. |
| `AdminPqrs.tsx` | Administración completa de PQR. | `useAdminPqrs`, `PqrTicketCard`, `ListToolbar`. |
| `AgentPqrs.tsx` | Atención de PQR disponibles y asignadas. | `useAgentPqrs`, `PqrTicketCard`. |
| `CreatePqr.tsx` | Creación de PQR. | `useCreatePqr`. |
| `MyPqrs.tsx` | Consulta, chat y calificación de PQR propias. | `useMyPqrs`, `PqrTicketCard`. |
| `AdminUsers.tsx` | Administración de usuarios. | `useAdminUsers`, tabla y diálogos. |
| `ChangePassword.tsx` | Cambio de contraseña propia. | `useChangePassword`. |

## Funciones de las páginas PQR

| Página | Funciones |
| --- | --- |
| `AdminPqrs.tsx` | Consultar, buscar, filtrar, cambiar estado/prioridad, asignar, reasignar, desasignar, abrir chat y ver calificación. |
| `AgentPqrs.tsx` | Consultar disponibles/asignadas, tomar PQR, gestionar atención y revisar mensajes. |
| `CreatePqr.tsx` | Tipo de caso, descripción, adjunto y creación. |
| `MyPqrs.tsx` | Consulta, filtros, chat, adjuntos y calificación. |

---

# 12. `src/routes/`

```txt
routes/
├── AppRoutes.tsx
├── PrivateRoute.tsx
└── PublicRoute.tsx
```

| Archivo | Descripción | Uso |
| --- | --- | --- |
| `AppRoutes.tsx` | Relaciona rutas y páginas. | Navegación principal. |
| `PrivateRoute.tsx` | Protege rutas autenticadas y controla roles cuando corresponde. | Zona privada. |
| `PublicRoute.tsx` | Controla login y registro cuando no existe sesión. | Zona pública. |

| Ruta | Página | Acceso |
| --- | --- | --- |
| `/` | Login | Público |
| `/register` | Register | Público |
| `/dashboard` | Dashboard | Autenticado |
| `/dashboard/loans/simulator` | LoanSimulator | USER / AGENT / ADMIN |
| `/dashboard/pqrs/my` | MyPqrs | USER / AGENT |
| `/dashboard/pqrs/create` | CreatePqr | USER / AGENT |
| `/dashboard/pqrs` | AdminPqrs | ADMIN |
| `/agent/pqrs` | AgentPqrs | AGENT |
| `/users` | AdminUsers | ADMIN |
| `/change-password` | ChangePassword | Autenticado |

---

# 13. `src/services/`

```txt
services/
│
├── auth/
│   └── authService.ts
│
├── common/
│   └── identificationTypeService.ts
│
├── notifications/
│   └── notificationService.ts
│
├── pqrs/
│   └── pqrService.ts
│
├── sockets/
│   └── socketService.ts
│
└── users/
    └── userService.ts
```

| Servicio | Descripción | Uso |
| --- | --- | --- |
| `authService.ts` | Peticiones de login, registro y contraseña. | Hooks auth. |
| `identificationTypeService.ts` | Consulta tipos de identificación. | Catálogo común. |
| `notificationService.ts` | Consulta y lectura de notificaciones. | `useNotifications`. |
| `pqrService.ts` | Peticiones HTTP de PQR. | Hooks PQR. |
| `socketService.ts` | Conexión y eventos Socket.IO. | AuthContext, chat y notificaciones. |
| `userService.ts` | Administración de usuarios y carga masiva. | Hooks users. |

## `authService.ts`

| Función | Descripción |
| --- | --- |
| `loginUser(data)` | Inicia sesión. |
| `registerUser(data)` | Registra usuario. |
| `changePassword(data)` | Cambia contraseña propia. |

## `identificationTypeService.ts`

| Función | Descripción |
| --- | --- |
| `getIdentificationTypes()` | Consulta los tipos de identificación activos. |

## `notificationService.ts`

| Función | Descripción |
| --- | --- |
| `getNotifications()` | Consulta notificaciones. |
| `getUnreadNotificationsCount()` | Cuenta no leídas. |
| `markNotificationAsRead(id)` | Marca una como leída. |
| `markAllNotificationsAsRead()` | Marca todas como leídas. |

## `pqrService.ts`

| Función | Descripción |
| --- | --- |
| `createPqr(data)` | Crea una PQR. |
| `getMyPqrs()` | Consulta PQR propias. |
| `getAllPqrs()` | Consulta todas las PQR. |
| `updatePqrStatus(id, status)` | Cambia estado. |
| `updatePqrPriority(id, priority)` | Cambia prioridad. |
| `getPqrMessages(pqrId)` | Consulta mensajes. |
| `markPqrChatAsRead(pqrId)` | Marca chat leído. |
| `sendPqrMessageWithAttachment(...)` | Envía mensaje con archivo. |
| `getAvailablePqrs()` | Consulta PQR disponibles. |
| `takePqr(pqrId)` | Toma una PQR. |
| `assignPqr(pqrId, agentId)` | Asigna o reasigna. |
| `unassignPqr(pqrId)` | Desasigna. |
| `getMyAssignedPqrs()` | Consulta PQR asignadas. |
| `ratePqr(pqrId, data)` | Califica una PQR cerrada. |

## `socketService.ts`

| Función | Descripción |
| --- | --- |
| `connectSocket(token)` | Conecta Socket.IO. |
| `getSocket()` | Retorna instancia activa. |
| `joinPqrRoom(pqrId)` | Ingresa a una sala PQR. |
| `sendPqrMessage(pqrId, content)` | Envía texto en tiempo real. |
| `listenJoinedPqrRoom(callback)` | Escucha confirmación de ingreso. |
| `listenNewPqrMessage(callback)` | Escucha nuevos mensajes. |
| `listenPqrUnreadCountUpdated(callback)` | Escucha contador de mensajes. |
| `listenNewNotification(callback)` | Escucha notificaciones. |
| `listenSocketError(callback)` | Escucha errores. |
| `removePqrSocketListeners()` | Elimina listeners PQR. |
| `removeNotificationSocketListeners()` | Elimina listeners de notificaciones. |
| `disconnectSocket()` | Desconecta el socket. |

## `userService.ts`

| Función | Descripción |
| --- | --- |
| `getAllUsers()` | Consulta usuarios. |
| `getAgents()` | Consulta agentes. |
| `updateUserRole(userId, role)` | Cambia rol. |
| `resetUserPassword(userId, data)` | Restablece contraseña. |
| `uploadUsersBulk(file)` | Carga usuarios desde Excel. |

---

# 14. `src/styles/`

```txt
styles/
├── filterStyles.ts
└── tableStyles.ts
```

| Archivo | Descripción | Uso |
| --- | --- | --- |
| `filterStyles.ts` | Centraliza estilos del contenido de filtros. | Listados PQR y usuarios. |
| `tableStyles.ts` | Centraliza estilos visuales de tablas. | Tablas y acciones. |

## `filterStyles.ts`

| Estilo | Descripción |
| --- | --- |
| `filterMenuContent` | Organiza los controles del menú. |
| `filterDateRow` | Distribuye fechas de forma responsiva. |
| `filterDateInput` | Define apariencia del campo de fecha. |
| `clearFilterButton` | Define apariencia del botón de limpiar. |

## `tableStyles.ts`

| Estilo | Descripción |
| --- | --- |
| `rowNumber` | Estilo del consecutivo. |
| `primaryActionButton` | Acción principal. |
| `neutralActionButton` | Acción secundaria. |

---

# 15. `src/template/`

```txt
template/
└── users/
    └── downloadBulkUsersTemplate.ts
```

| Archivo / función | Descripción | Uso |
| --- | --- | --- |
| `downloadBulkUsersTemplate.ts` | Genera la plantilla Excel para carga masiva. | Administración de usuarios. |
| `downloadBulkUsersTemplate()` | Crea libro, columnas, estilos, validaciones y descarga. | Botón de descarga de plantilla. |

---

# 16. `src/theme/`

```txt
theme/
└── theme.ts
```

| Archivo | Descripción | Uso |
| --- | --- | --- |
| `theme.ts` | Define colores, tipografía, fondos y personalizaciones globales de Material UI. | Toda la aplicación mediante `ThemeProvider`. |

---

# 17. `src/utils/`

```txt
utils/
│
├── common/
│   ├── avatarUtils.ts
│   ├── dateUtils.ts
│   ├── excelUtils.ts
│   ├── fileUrl.ts
│   ├── fileUtils.ts
│   ├── formatText.ts
│   ├── getErrorMessage.ts
│   └── numberUtils.ts
│
├── loans/
│   └── loanCalculator.ts
│
├── pqrs/
│   └── pqrUtils.ts
│
└── users/
    └── userRoleUtils.tsx
```

## Utilidades comunes

| Archivo | Función(es) | Descripción |
| --- | --- | --- |
| `avatarUtils.ts` | `getInitials()` | Obtiene iniciales. |
| `dateUtils.ts` | `formatDate()` | Formatea fechas. |
| `excelUtils.ts` | `toExcelColor()` | Convierte colores para ExcelJS. |
| `fileUrl.ts` | `buildFileUrl()` | Construye URL completas. |
| `fileUtils.ts` | `formatFileSize()`, `downloadFile()` | Presenta y descarga archivos. |
| `formatText.ts` | `capitalizeText()`, `getOptionLabel()` | Convierte valores en etiquetas legibles. |
| `getErrorMessage.ts` | `getErrorMessage()` | Interpreta errores HTTP. |
| `numberUtils.ts` | `cleanNumberInput()`, `formatNumberInput()`, `formatMoney()` | Limpia y formatea números y dinero. |

## Utilidades de préstamos

| Archivo / función | Descripción | Uso |
| --- | --- | --- |
| `loanCalculator.ts` | Contiene la lógica matemática del simulador. | `useLoanSimulator.ts`. |
| `calculateLoanSimulation()` | Calcula interés, períodos, réditos, total, cuotas y valor por cuota. | Genera `LoanSimulationResult`. |

## Utilidades PQR

| Función | Descripción |
| --- | --- |
| `getStatusColor(status)` | Retorna el color visual del estado. |
| `getCaseTypeLabel(caseType)` | Retorna etiqueta legible del tipo de caso. |

## Utilidades de usuarios

| Función | Descripción |
| --- | --- |
| `getUserRoleColor(role)` | Retorna color del rol. |
| `getUserRoleIcon(role)` | Retorna ícono del rol. |
| `getUserRoleLabel(role)` | Retorna etiqueta del rol. |

---

# 18. `src/validations/`

```txt
validations/
│
├── auth/
│   └── authValidation.ts
│
├── loans/
│   └── loanValidation.ts
│
├── pqrs/
│   └── pqrValidation.ts
│
└── users/
    └── userValidation.ts
```

| Archivo | Esquema | Descripción | Uso |
| --- | --- | --- | --- |
| `authValidation.ts` | `loginSchema()` | Valida login. | `useLogin.ts`. |
| `authValidation.ts` | `registerSchema()` | Valida registro. | `useRegister.ts`. |
| `authValidation.ts` | `changePasswordSchema()` | Valida contraseña actual, nueva y confirmación. | `useChangePassword.ts`. |
| `loanValidation.ts` | `loanSimulationSchema` | Valida monto, tasa, frecuencias y plazo. | `useLoanSimulator.ts`. |
| `pqrValidation.ts` | `createPqrSchema()` | Valida tipo de caso y descripción. | `useCreatePqr.ts`. |
| `userValidation.ts` | `resetUserPasswordSchema()` | Valida nueva contraseña y confirmación. | `useChangeUserPassword.ts`. |

---

# 19. Archivos principales

| Archivo | Descripción | Responsabilidad |
| --- | --- | --- |
| `App.tsx` | Componente principal. | Renderizar la configuración base y rutas. |
| `main.tsx` | Punto de entrada React. | Inicializar Router, ThemeProvider, AuthProvider y CssBaseline. |