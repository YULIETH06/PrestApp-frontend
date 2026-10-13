# Documentación de la estructura del proyecto frontend — PrestApp

## 1. Descripción general

El frontend de **PrestApp** está desarrollado con **React**, **TypeScript**, **Vite**, **Material UI**, **React Router DOM**, **Axios** y **Socket.IO Client**.

PrestApp es una aplicación para que cada persona administre el dinero que presta: define el porcentaje de interés y la forma de pago. Hoy el frontend tiene los siguientes módulos:

| Módulo | Responsabilidad actual |
| --- | --- |
| Autenticación | Registro, inicio de sesión, sesión con JWT y cambio de contraseña propia. |
| Préstamos | Simulador de préstamos (calcula en el navegador, no guarda información). |
| Usuarios | El administrador consulta usuarios, cambia roles, restablece contraseñas y registra usuarios por Excel. |
| Notificaciones | Consultar, marcar como leídas y recibir notificaciones en tiempo real. |

| Rol | Descripción |
| --- | --- |
| `USER` | Usuario que administra sus propios préstamos. Hoy tiene acceso al simulador. |
| `ADMIN` | Dueño del sistema. Además del simulador, administra los usuarios. |

La estructura del proyecto está organizada de forma modular para separar responsabilidades, mejorar el mantenimiento del código y permitir la reutilización de componentes en diferentes vistas del sistema.

La idea principal de esta organización es que cada carpeta tenga una función clara dentro del proyecto. De esta manera, las páginas, componentes, servicios, hooks, estilos, rutas y utilidades se mantienen separados y son más fáciles de modificar o ampliar cuando se agreguen los módulos de Clientes, Préstamos, Membresía y Pagos.

---

## 2. Estructura principal del proyecto

```txt
public/
│
├── assets/
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

---

## 3. Descripción de cada carpeta

### `public/`

La carpeta `public/` contiene archivos estáticos que se sirven directamente desde la raíz del proyecto cuando la aplicación se ejecuta o se compila.

En proyectos desarrollados con Vite, los archivos ubicados dentro de `public/` pueden utilizarse directamente mediante rutas absolutas, sin necesidad de importarlos en los componentes.

**Responsabilidad principal:**

```txt
Guardar archivos públicos que deben estar disponibles directamente para la aplicación.
```

---

### `public/assets/`

La carpeta contiene los recursos gráficos públicos del sistema.

En este proyecto se utiliza para guardar los logos de PrestApp. Las rutas están registradas en `src/data/appBrand.ts`.

```txt
public/
└── assets/
    ├── logo.png
    ├── logo-blanco.png
    ├── logo-icono.png
    └── logo-blanco-icono.png
```

**Responsabilidad principal:**

```txt
Guardar los logos e íconos públicos del sistema.
```

En Vite, los archivos que están dentro de `public/assets/` no se importan con `import`.
Estos archivos se utilizan directamente mediante rutas públicas.

**Se usa en el código como:**

```txt
/assets/logo.png
```

---

### `src/api/`

Esta carpeta contiene la configuración base para la comunicación con el backend.

Aquí se ubica la instancia de Axios, donde se define la URL base de la API (`VITE_API_URL`) y un interceptor que envía automáticamente el token de autenticación en el encabezado `Authorization: Bearer <token>` cuando el usuario ha iniciado sesión.

```txt
api/
└── axios.ts
```

**Responsabilidad principal:**

```txt
Configurar la conexión HTTP con el backend.
```

---

### `src/components/`

Esta carpeta contiene los componentes visuales del proyecto. Su objetivo principal es organizar la interfaz en piezas reutilizables, evitando repetir código y facilitando el mantenimiento del sistema.

Los componentes se organizan según su nivel de reutilización y el módulo al que pertenecen.

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
│   ├── inputs/
│   │   ├── DateInput.tsx
│   │   ├── FileInput.tsx
│   │   ├── MoneyInput.tsx
│   │   ├── NumberInput.tsx
│   │   ├── PasswordInput.tsx
│   │   ├── TextAreaInput.tsx
│   │   └── TextInput.tsx
│   ├── ListToolbar.tsx
│   ├── LoadingBox.tsx
│   ├── NotificationBell.tsx
│   ├── PageContainer.tsx
│   ├── PageHeader.tsx
│   ├── ProcessStepper.tsx
│   ├── RadioOptionGroup.tsx
│   ├── SectionCard.tsx
│   ├── StatsSummary.tsx
│   └── ViewToggleButtons.tsx
│
├── layouts/
│   ├── DashboardLayout.tsx
│   ├── Header.tsx
│   └── SidebarMenu.tsx
│
├── loans/
│   └── LoanSummaryCard.tsx
│
└── users/
    ├── ChangeUserPasswordDialog.tsx
    ├── ChangeUserRoleDialog.tsx
    ├── SettingsMenu.tsx
    └── UserRoleChip.tsx
```

---

#### `src/components/common/`

En esta carpeta se ubican los componentes comunes o reutilizables del sistema.
Estos componentes no pertenecen exclusivamente a un módulo, por lo tanto, pueden usarse en diferentes vistas como usuarios, préstamos, clientes, pagos u otros módulos futuros.

Algunos componentes todavía no se usan en ninguna vista. Se conservan porque serán útiles en los próximos módulos; se marcan como **Sin uso actualmente**.

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `ActionButton.tsx` | Botón reutilizable para las acciones principales del sistema. Obtiene el ícono según el tipo de acción (`save`, `cancel`, `clear`, `custom`…) desde el catálogo `appIcons.ts` y controla estados de carga y deshabilitado. | Se utiliza en `Login.tsx`, `Register.tsx`, `LoanSimulator.tsx`, `AdminUsers.tsx` y en los diálogos de usuarios. |
| `BulkUploadDialog.tsx` | Modal reutilizable para cargas masivas con archivo Excel. Permite descargar la plantilla, seleccionar el archivo, enviarlo y mostrar el resultado con los errores por fila y columna. | Se utiliza en `AdminUsers.tsx` para la carga masiva de usuarios. |
| `ClearableSelect.tsx` | Selector reutilizable que permite escoger una opción y, cuando `clearable` está habilitado, limpiar el valor seleccionado. | Se utiliza en `LoanSimulator.tsx` (frecuencias), `AdminUsers.tsx` (filtro de rol) y `ChangeUserRoleDialog.tsx`. |
| `CustomDialog.tsx` | Estructura base de los diálogos del sistema: tamaño, título, subtítulo, botón de cierre, contenido y acciones. | Se utiliza en `ChangeUserRoleDialog.tsx` y `ChangeUserPasswordDialog.tsx`. |
| `CustomSnackbar.tsx` | Muestra mensajes temporales de éxito, error, advertencia o información. | Se utiliza en `Register.tsx`, `ChangePassword.tsx` y `AdminUsers.tsx`. |
| `DataTable.tsx` | Tabla reutilizable con encabezado fijo, columnas configurables, acciones y paginación. | Se utiliza en `AdminUsers.tsx`. Servirá para listar clientes, préstamos y pagos. |
| `EmptyState.tsx` | Muestra un mensaje cuando no existen datos disponibles. | Se utiliza en `AdminUsers.tsx`. |
| `FormGrid.tsx` | Organiza campos de formularios mediante CSS Grid con columnas responsivas. | Se utiliza en `LoanSimulator.tsx`. |
| `IconActionButton.tsx` | Botón compacto de ícono con tooltip, estado de carga, activo y deshabilitado. Obtiene el ícono desde `appIcons.ts`. | Se utiliza en `AdminUsers.tsx`, `ListToolbar.tsx` y `CustomDialog.tsx`. |
| `ListToolbar.tsx` | Barra de encabezado para listados. Centraliza el buscador, el menú de filtros, la actualización y las acciones adicionales. | Se utiliza en `AdminUsers.tsx`. |
| `LoadingBox.tsx` | Indicador de carga centrado con altura y tamaño configurables. | Se utiliza en `PublicRoute.tsx` y `AdminUsers.tsx`. |
| `NotificationBell.tsx` | Campana de notificaciones con contador de no leídas y listado de notificaciones del usuario autenticado. | Se utiliza dentro de `Header.tsx`. |
| `PageContainer.tsx` | Contenedor general que mantiene márgenes y espaciados consistentes en una página. | Se utiliza en `ChangePassword.tsx`. |
| `PageHeader.tsx` | Encabezado de página con título, subtítulo y acciones. | Se utiliza en `LoanSimulator.tsx` y `ChangePassword.tsx`. |
| `SectionCard.tsx` | Tarjeta visual para agrupar contenido con título, subtítulo y acciones opcionales. | Se utiliza en `LoanSimulator.tsx` para las secciones Información del préstamo, Plazo y Modalidad de pago. |
| `ConfirmActionDialog.tsx` | Diálogo de confirmación antes de ejecutar una acción importante. | **Sin uso actualmente.** Servirá para confirmar acciones como anular un préstamo o registrar un pago. |
| `CustomAccordion.tsx` | Contenido expandible con título y contenido personalizado. | **Sin uso actualmente.** |
| `CustomChip.tsx` | Etiqueta con colores del tema o personalizados. | **Sin uso actualmente.** Servirá para estados de préstamos y cuotas. |
| `FormSection.tsx` | Agrupa campos dentro de una sección con título. | **Sin uso actualmente.** |
| `InfoItem.tsx` | Muestra un dato etiqueta–valor solo cuando el valor tiene información. | **Sin uso actualmente.** Servirá en el detalle de clientes y préstamos. |
| `InfoTooltip.tsx` | Panel flotante con información adicional. | **Sin uso actualmente.** |
| `ProcessStepper.tsx` | Representa procesos por etapas mediante `Stepper`. | **Sin uso actualmente.** |
| `RadioOptionGroup.tsx` | Selección de una única opción con botones de radio. | **Sin uso actualmente.** |
| `StatsSummary.tsx` | Tarjetas de resumen con ícono, etiqueta y valor. | **Sin uso actualmente.** Candidato para el Dashboard. |
| `ViewToggleButtons.tsx` | Botones para cambiar entre vistas o categorías. | **Sin uso actualmente.** |

##### `src/components/common/inputs/`

Esta subcarpeta agrupa los campos de entrada reutilizables del sistema y mantiene un comportamiento visual consistente en los formularios.

```txt
components/common/inputs/
├── DateInput.tsx
├── FileInput.tsx
├── MoneyInput.tsx
├── NumberInput.tsx
├── PasswordInput.tsx
├── TextAreaInput.tsx
└── TextInput.tsx
```

| Componente | Uso principal | Uso dentro del proyecto |
| --- | --- | --- |
| `MoneyInput.tsx` | Captura valores monetarios y los muestra con separador de miles (`formatNumberInput`). | `LoanSimulator.tsx` (Monto prestado). |
| `NumberInput.tsx` | Captura números enteros. Con la propiedad `decimal` acepta decimales con punto o coma (`cleanDecimalInput`). | `LoanSimulator.tsx` (% Interés con `decimal` y Plazo). |
| `PasswordInput.tsx` | Captura contraseñas y permite mostrar u ocultar su contenido. | `Login.tsx`, `Register.tsx`, `ChangePassword.tsx`, `ChangeUserPasswordDialog.tsx`. |
| `TextInput.tsx` | Captura textos de una sola línea. | `Login.tsx`, `Register.tsx`. |
| `DateInput.tsx` | Captura fechas mediante `type="date"`. | **Sin uso actualmente.** Servirá para la fecha de inicio del préstamo. |
| `FileInput.tsx` | Selección y visualización de archivos (nombre, tamaño, eliminación). | **Sin uso actualmente.** |
| `TextAreaInput.tsx` | Captura observaciones y textos extensos. | **Sin uso actualmente.** Servirá para las notas del cliente. |

El objetivo de `components/common/` es centralizar todos los elementos visuales que pueden servir en varias partes del sistema. Por ejemplo, `DataTable.tsx` no debe ser una tabla exclusiva para usuarios, sino una tabla general que pueda adaptarse a usuarios, clientes, préstamos o pagos.

Para los listados, `ListToolbar.tsx` es el componente estándar para búsqueda, filtros y actualización. Los filtros deben utilizar `ClearableSelect.tsx` en lugar de `Select` y `MenuItem` directos cuando no exista una necesidad específica que lo impida.

Regla funcional de búsqueda y filtros:

```txt
Si un dato tiene un filtro específico, no debe incluirse también en la búsqueda textual.
```

---

#### `src/components/layouts/`

En esta carpeta se ubican los componentes encargados de definir la estructura visual general y la navegación principal de las páginas internas del sistema.

```txt
components/layouts/
├── DashboardLayout.tsx
├── Header.tsx
└── SidebarMenu.tsx
```

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `DashboardLayout.tsx` | Estructura principal de las páginas internas. Organiza el `Header`, el `SidebarMenu` (fijo en escritorio y flotante en móvil) y el área `<Outlet />` donde se muestra cada vista. | Envuelve todas las rutas protegidas en `AppRoutes.tsx`. |
| `Header.tsx` | Encabezado superior. Muestra el logo (`appBrand`), el botón para abrir o cerrar el menú, `NotificationBell`, `SettingsMenu` y el botón **Cerrar sesión**. | Se utiliza dentro de `DashboardLayout.tsx`. |
| `SidebarMenu.tsx` | Menú lateral. Muestra las opciones de `menuItems.ts` filtradas según el rol del usuario autenticado. | Se utiliza dentro de `DashboardLayout.tsx`. |

Estos componentes se mantienen en `components/layouts/` porque forman parte de la estructura y navegación global de las vistas protegidas.

---

#### `src/components/loans/`

En esta carpeta se ubican los componentes visuales específicos del módulo de préstamos.

```txt
components/loans/
└── LoanSummaryCard.tsx
```

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `LoanSummaryCard.tsx` | Tarjeta lateral con el resultado de la simulación: monto prestado, interés, réditos generados, tiempo total, número de cuotas, valor por cuota y última cuota cuando es diferente por el ajuste del redondeo. | Se utiliza en `LoanSimulator.tsx`. |

Cuando se creen los préstamos reales (etapa C), sus componentes también se ubicarán aquí.

---

#### `src/components/users/`

En esta carpeta se ubican los componentes específicos del módulo de usuarios.

```txt
components/users/
├── ChangeUserPasswordDialog.tsx
├── ChangeUserRoleDialog.tsx
├── SettingsMenu.tsx
└── UserRoleChip.tsx
```

| Componente | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `ChangeUserPasswordDialog.tsx` | Diálogo con el que el administrador restablece la contraseña de un usuario. Solicita la nueva contraseña y su confirmación y muestra los errores de validación. | Se utiliza desde `AdminUsers.tsx`. |
| `ChangeUserRoleDialog.tsx` | Diálogo para cambiar el rol (USER o ADMIN) de un usuario seleccionado. | Se utiliza desde `AdminUsers.tsx`. |
| `SettingsMenu.tsx` | Menú desplegable de configuración del usuario autenticado. Hoy tiene la opción **Cambiar contraseña**, que navega a `/change-password`. | Se utiliza desde `Header.tsx`. |
| `UserRoleChip.tsx` | Chip que muestra el rol del usuario con color, texto e ícono (`userRoleUtils.tsx`). | Se utiliza en `AdminUsers.tsx` y `ChangeUserRoleDialog.tsx`. |

Estos componentes no se ubican en `components/common/` porque su responsabilidad está directamente relacionada con los usuarios.

---

#### Regla de organización de componentes

```txt
Si el componente puede usarse en varias vistas, debe ir en components/common.
Si el componente solo pertenece a un módulo específico, debe ir en components/nombreModulo.
Si el componente define la estructura visual general de una página, debe ir en components/layouts.
Los íconos reutilizables deben obtenerse desde el catálogo central ubicado en icons/appIcons.ts.
```

---

### `src/context/`

Esta carpeta contiene los contextos globales de React.

Se utiliza para manejar información que debe estar disponible en varias partes de la aplicación, como el usuario autenticado, el token, la sesión activa y el cierre de sesión.

```txt
context/
└── AuthContext.tsx
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `AuthContext.tsx` | Contexto encargado de manejar el usuario autenticado, el token, el inicio y cierre de sesión y la conexión con Socket.IO. Expone el hook `useAuth()`. | Lo usan las rutas (`PrivateRoute`, `PublicRoute`), `Header`, `SidebarMenu` y los hooks de autenticación. |

---

#### Responsabilidad principal

```txt
Manejar el estado global de autenticación.
Guardar y eliminar el token del localStorage.
Consultar el perfil del usuario autenticado.
Conectar Socket.IO cuando existe token y usuario.
Desconectar Socket.IO cuando el usuario cierra sesión.
```

---

#### Funcionamiento general de `AuthContext.tsx`

| Valor o función | Descripción |
| --- | --- |
| `user` | Usuario autenticado, obtenido de `GET /profile`. |
| `token` | JWT guardado en `localStorage` con la clave `token`. |
| `loading` | Es `true` mientras se verifica si existe una sesión guardada. |
| `isAuthenticated` | Es `true` solo cuando existen token **y** usuario. |
| `login(token)` | Guarda el token y consulta el perfil. |
| `logout()` | Desconecta el socket, elimina el token y limpia el usuario. |

Cuando el usuario inicia sesión, el token se guarda en el `localStorage` y en el estado del contexto. Luego se consulta el perfil mediante `GET /profile`. Si la consulta falla (por ejemplo, el token venció), el token se elimina y el usuario vuelve al login.

Cuando ya existen token y usuario, el contexto conecta Socket.IO para recibir notificaciones en tiempo real.

Cuando el usuario cierra sesión, se desconecta Socket.IO, se elimina el token del `localStorage` y se limpia la información del usuario.

---

### `src/data/`

Esta carpeta contiene datos estáticos o listas reutilizables dentro del frontend.

Los archivos ubicados en `data/` no manejan lógica compleja ni realizan peticiones al backend. Su función principal es centralizar información fija que se usa en diferentes partes del sistema.

```txt
data/
├── appBrand.ts
├── loanOptions.ts
├── menuItems.ts
└── userRoles.ts
```

**Responsabilidad principal:**

```txt
Centralizar datos fijos para evitar escribirlos repetidamente en los componentes.
```

---

#### `appBrand.ts`

Contiene la información visual fija de la marca del sistema.

| Propiedad | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `name` | Nombre de la aplicación: `"Sistema PrestApp"`. | Disponible para títulos y encabezados. |
| `logo` | Ruta del logo principal a color (`/assets/logo.png`). | Se utiliza en `Header.tsx`. |
| `logoWhite` | Ruta del logo en blanco (`/assets/logo-blanco.png`). | Para fondos oscuros. |
| `logoIcon` | Ruta del ícono del logo a color (`/assets/logo-icono.png`). | Se utiliza en `Header.tsx` cuando el espacio es reducido. |
| `logoWhiteIcon` | Ruta del ícono del logo en blanco (`/assets/logo-blanco-icono.png`). | Para fondos oscuros. |
| `logoAlt` | Texto alternativo de la imagen. | Accesibilidad y descripción si la imagen no carga. |

---

#### `loanOptions.ts`

Contiene las opciones estáticas del módulo de préstamos.

| Constante | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `loanFrequencyOptions` | Frecuencias: Diario (`DAILY`), Semanal (`WEEKLY`), Quincenal (`BIWEEKLY`) y Mensual (`MONTHLY`). | Se utiliza en `LoanSimulator.tsx` para **Frecuencia del interés** y **Frecuencia de pago**. |
| `loanTermFrequencyOptions` | Unidades del plazo: Días, Semanas, Quincenas y Meses (mismos valores). | Se utiliza en `LoanSimulator.tsx` para **Unidad del plazo**. |

---

#### `menuItems.ts`

Contiene las opciones del menú lateral. Cada opción tiene nombre, ruta y los roles que pueden verla.

| Módulo | Submódulo | Opción | Ruta | Roles |
| --- | --- | --- | --- | --- |
| Préstamos | Herramientas | Simulador de préstamos | `/dashboard/loans/simulator` | USER, ADMIN |
| Usuarios | Gestión de usuarios | Administrar usuarios | `/users` | ADMIN |

**Responsabilidad principal:**

```txt
Centralizar las opciones de navegación del sistema y los roles que pueden verlas.
```

---

#### `userRoles.ts`

Contiene la lista de roles disponibles: `["USER", "ADMIN"]`. Importa el tipo `UserRole` para asegurar que los valores coincidan con los permitidos.

| Constante | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `userRoles` | Lista de roles del sistema. | Se utiliza en el filtro de rol de `AdminUsers.tsx` y en `ChangeUserRoleDialog.tsx`. |

---

### `src/hooks/`

Los hooks permiten separar la lógica de una página o componente, dejando los componentes visuales más limpios, organizados y fáciles de mantener.

En lugar de manejar toda la lógica dentro de las páginas, los hooks se encargan de consultar datos, validar y enviar formularios, manejar estados de carga, controlar errores y escuchar eventos en tiempo real.

---

#### Estructura

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
└── users/
    ├── useAdminUsers.ts
    └── useChangeUserPassword.ts
```

---

#### Responsabilidad principal

```txt
Separar la lógica de negocio, estado y eventos de los componentes visuales.
```

---

#### Hooks del módulo de autenticación

```txt
hooks/auth/
├── useChangePassword.ts
├── useLogin.ts
└── useRegister.ts
```

| Hook | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `useChangePassword.ts` | Maneja los campos, la validación con `changePasswordSchema`, la carga y los mensajes del cambio de contraseña del usuario autenticado. | Se utiliza en `ChangePassword.tsx`. |
| `useLogin.ts` | Valida con `loginSchema`, llama a `loginUser()`, guarda la sesión con `login(token)` y navega a `/dashboard`. | Se utiliza en `Login.tsx`. |
| `useRegister.ts` | Valida con `registerSchema`, llama a `registerUser()`, muestra el mensaje de respuesta y navega a `/`. | Se utiliza en `Register.tsx`. |

---

#### Hooks del módulo de préstamos

```txt
hooks/loans/
└── useLoanSimulator.ts
```

| Hook | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `useLoanSimulator.ts` | Maneja el formulario del simulador. Actualiza los campos, limpia el error del campo modificado y borra el resultado anterior cuando cambia un dato. Valida con `loanSimulationSchema`, ejecuta `calculateLoanSimulation()` y permite limpiar el formulario. | Se utiliza en `LoanSimulator.tsx`. |

**Expone:**

```txt
form, result, errors, hasFormChanges
handleChange(), handleNumberChange(), handleFormattedNumberChange()
handleSimulate(), handleClearForm()
```

---

#### Hooks del módulo de notificaciones

```txt
hooks/notifications/
└── useNotifications.ts
```

| Hook | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `useNotifications.ts` | Consulta el listado de notificaciones y el contador de no leídas, permite marcar una o todas como leídas y escucha nuevas notificaciones mediante Socket.IO. | Se utiliza en `NotificationBell.tsx`. |

> Ver Problemas-comunes **P-03**: el listener de Socket.IO puede registrarse antes de que exista la conexión.

---

#### Hooks del módulo de usuarios

```txt
hooks/users/
├── useAdminUsers.ts
└── useChangeUserPassword.ts
```

| Hook | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `useAdminUsers.ts` | Maneja la administración de usuarios: consulta del listado, cambio de rol (actualiza la fila sin recargar), carga masiva por Excel y mensajes de cada operación. | Se utiliza en `AdminUsers.tsx`. |
| `useChangeUserPassword.ts` | Maneja el restablecimiento administrativo de contraseña: usuario seleccionado, apertura y cierre del diálogo, validación con `resetUserPasswordSchema`, carga, mensajes y envío al servicio. | Se utiliza en `AdminUsers.tsx` junto con `ChangeUserPasswordDialog.tsx`. |

---

### `src/icons/`

Esta carpeta centraliza los íconos utilizados para representar acciones comunes del sistema.

Su objetivo es evitar que los componentes dependan directamente de un ícono específico de Material UI. Si en el futuro se desea cambiar la representación visual de una acción, el cambio se realiza desde un único archivo.

#### Estructura

```txt
icons/
└── appIcons.ts
```

#### `appIcons.ts`

Contiene el catálogo central de íconos asociados con acciones del sistema:

```txt
save, edit, cancel, approve, reject, delete, view, hide, open, create,
send, clear, back, print, file, upload, download, lock, unlock, history,
settings, signature, changePassword, search, filter, refresh,
folderOpen, assignment, pending, completed, calendar, review, chat, rating, play
```

También define el tipo `AppIconName`, que limita los nombres de íconos permitidos en los componentes que consumen este catálogo.

> El catálogo viene del proyecto anterior. Algunos nombres (por ejemplo `signature`, `chat`, `rating`, `review`) hoy no se usan en PrestApp. No hace falta borrarlos; pueden servir más adelante.

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `appIcons.ts` | Relación entre cada acción del sistema y el ícono que la representa. | Se utiliza desde `ActionButton.tsx`, `IconActionButton.tsx`, `SettingsMenu.tsx`, `ListToolbar.tsx` y `AdminUsers.tsx`, entre otros. |

**Responsabilidad principal:**

```txt
Centralizar los íconos reutilizables del sistema.
Permitir cambiar un ícono desde un único lugar.
Evitar imports directos repetidos desde @mui/icons-material cuando el ícono ya existe en el catálogo.
```

---

### `src/interfaces/`

Esta carpeta contiene las interfaces y tipos de TypeScript que definen la estructura de los datos utilizados en el proyecto: usuarios, autenticación, préstamos, notificaciones, respuestas del backend, carga masiva y formularios.

---

#### Estructura

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
└── users/
    ├── bulkUpload.interface.ts
    ├── excel.interface.ts
    └── user.interface.ts
```

| Archivo | Tipos principales | Uso dentro del proyecto |
| --- | --- | --- |
| `auth/auth.interface.ts` | `LoginData`, `AuthUser`, `LoginResponse`, `ProfileResponse`, `RegisterData`, `RegisterResponse`, `ChangePasswordData`, `ChangePasswordResponse` y los errores de cada formulario. | `authService.ts`, `AuthContext.tsx` y hooks de autenticación. |
| `common/identificationType.interface.ts` | `IdentificationType`, `IdentificationTypesResponse`. | `identificationTypeService.ts`. Se usará en el módulo de Clientes. |
| `common/message.interface.ts` | `MessageType` (`success`, `error`, `info`, `warning`). | **Sin uso actualmente.** |
| `loans/loan.interface.ts` | `LoanFrequency` (`DAILY`, `WEEKLY`, `BIWEEKLY`, `MONTHLY`), `LoanSimulationForm`, `LoanSimulationResult`. | `useLoanSimulator.ts`, `loanCalculator.ts`, `LoanSummaryCard.tsx`. |
| `notifications/notification.interface.ts` | `NotificationType` (`GENERAL`), `Notification` y las respuestas del listado, contador y marcado. | `notificationService.ts`, `socketService.ts`, `useNotifications.ts`. Ver Problemas-comunes **P-01** (`pqrId` sobrante). |
| `users/user.interface.ts` | `UserRole` (`USER`, `ADMIN`), `User`, `ResetUserPasswordFormData`, `ResetUserPasswordData`, `ResetUserPasswordErrors`. | `userService.ts`, hooks y componentes de usuarios. |
| `users/bulkUpload.interface.ts` | `BulkUploadColumnError`, `BulkUploadError`, `BulkUploadResult`, `BulkUploadResponse`, `BulkUploadDialogProps`. | `BulkUploadDialog.tsx`, `userService.ts`, `useAdminUsers.ts`. |
| `users/excel.interface.ts` | `WorksheetWithDataValidations` (tipo auxiliar para la lista desplegable de rol en ExcelJS). | `downloadBulkUsersTemplate.ts`. |

---

### `src/pages/`

Esta carpeta contiene las páginas principales de la aplicación.

Cada archivo representa una vista completa asociada con una ruta del sistema. Las páginas organizan componentes, utilizan hooks y presentan la información al usuario.

Las páginas no deben realizar directamente peticiones HTTP ni concentrar lógica extensa. La comunicación con el backend se mantiene en los servicios y la lógica de estado, validación y acciones en los hooks.

---

#### Estructura

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
└── users/
    ├── AdminUsers.tsx
    └── ChangePassword.tsx
```

---

#### Responsabilidad principal

```txt
Construir las vistas completas del sistema utilizando componentes, hooks y datos obtenidos mediante los servicios.
```

---

#### Páginas generales

| Página | Descripción |
| --- | --- |
| `Dashboard.tsx` | Página principal de las vistas protegidas. Hoy muestra el título **Panel principal** y un texto de bienvenida; los indicadores se agregarán en la etapa F. |
| `LoanSimulator.tsx` | Simulador de préstamos. Usa `useLoanSimulator.ts` y muestra el formulario en tres `SectionCard` (**Información del préstamo**, **Plazo del préstamo**, **Modalidad de pago**) con los botones **Limpiar** y **Calcular préstamo**. El resultado se muestra en `LoanSummaryCard.tsx`. |

> `LoanSimulator.tsx` está directamente en `pages/`. Cuando se creen las páginas de préstamos reales conviene moverlo a `pages/loans/` junto con ellas.

---

#### Páginas de autenticación

```txt
pages/auth/
├── Login.tsx
└── Register.tsx
```

| Página | Descripción |
| --- | --- |
| `Login.tsx` | Formulario de inicio de sesión (correo y contraseña). Usa `useLogin.ts`. |
| `Register.tsx` | Formulario de registro (nombre completo, correo y contraseña). Usa `useRegister.ts`. |

Las páginas de autenticación se agrupan en `pages/auth/` porque corresponden a las rutas públicas del sistema.

---

#### Páginas del módulo de usuarios

```txt
pages/users/
├── AdminUsers.tsx
└── ChangePassword.tsx
```

| Página | Descripción |
| --- | --- |
| `AdminUsers.tsx` | Administración de usuarios (solo ADMIN). Muestra la tabla con las columnas Nombre, Correo, Rol y Acciones; permite buscar, filtrar por rol, cambiar rol, restablecer contraseña y hacer carga masiva por Excel. Usa `useAdminUsers.ts` y `useChangeUserPassword.ts`. |
| `ChangePassword.tsx` | Cambio de la contraseña del usuario autenticado. Usa `useChangePassword.ts`. |

---

#### Regla de organización de páginas

```txt
Las páginas generales sin un módulo específico se ubican directamente en pages.
Las páginas de autenticación se ubican en pages/auth.
Las páginas específicas de un módulo deben ubicarse en pages/nombreModulo.
Las páginas deben consumir hooks y componentes, evitando realizar directamente peticiones HTTP.
```

---

### `src/routes/`

La carpeta `routes/` contiene los archivos encargados de organizar el acceso a las páginas del sistema.

Su función principal es definir qué página se muestra según la dirección y controlar si el usuario puede acceder dependiendo de si tiene o no una sesión iniciada.

#### Estructura

```txt
routes/
├── AppRoutes.tsx
├── PrivateRoute.tsx
└── PublicRoute.tsx
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `AppRoutes.tsx` | Archivo principal de navegación. Define las rutas públicas y las privadas; las privadas se muestran dentro de `DashboardLayout`. | Se utiliza en `App.tsx`. |
| `PrivateRoute.tsx` | Permite el acceso solo si hay sesión. Si no la hay, redirige a `/`. Mientras se verifica la sesión muestra un indicador de carga. | Protege `/dashboard`, el simulador, `/users` y `/change-password`. |
| `PublicRoute.tsx` | Permite el acceso solo si **no** hay sesión. Si ya la hay, redirige a `/dashboard`. | Protege `Login.tsx` y `Register.tsx`. |

#### Rutas actuales

| Ruta | Página | Protección | Roles en el menú |
| --- | --- | --- | --- |
| `/` | `Login.tsx` | `PublicRoute` | — |
| `/register` | `Register.tsx` | `PublicRoute` | — |
| `/dashboard` | `Dashboard.tsx` | `PrivateRoute` | Todos |
| `/dashboard/loans/simulator` | `LoanSimulator.tsx` | `PrivateRoute` | USER, ADMIN |
| `/users` | `AdminUsers.tsx` | `PrivateRoute` | ADMIN |
| `/change-password` | `ChangePassword.tsx` | `PrivateRoute` | Todos (desde `SettingsMenu`) |

> `PrivateRoute` revisa la sesión, pero **no el rol**. El rol solo se revisa en el menú. Ver Problemas-comunes **P-02**.

---

### `src/services/`

Esta carpeta contiene las funciones encargadas de comunicarse con el backend.

Aquí se centralizan las peticiones HTTP realizadas con Axios y la comunicación en tiempo real mediante Socket.IO. Su objetivo es evitar que los componentes, páginas o hooks llamen directamente a la API o configuren manualmente la conexión con sockets.

---

#### Estructura

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
├── sockets/
│   └── socketService.ts
│
└── users/
    └── userService.ts
```

---

#### Responsabilidad principal de `services/`

```txt
Separar las peticiones HTTP y la comunicación en tiempo real de los componentes visuales.
```

> La única petición que no está en un servicio es `GET /profile`, que se hace directamente desde `AuthContext.tsx`.

---

#### Servicios del módulo de autenticación

```txt
services/auth/
└── authService.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `authService.ts` | Funciones HTTP de inicio de sesión, registro y cambio de contraseña. | Se utiliza desde los hooks de autenticación. |

##### Funciones en `authService.ts`

```txt
loginUser()
registerUser()
changePassword()
```

| Función | Endpoint | Descripción |
| --- | --- | --- |
| `loginUser(data)` | `POST /auth/login` | Envía el correo y la contraseña para iniciar sesión. |
| `registerUser(data)` | `POST /auth/register` | Envía nombre, correo y contraseña para registrar un usuario. |
| `changePassword(data)` | `PATCH /auth/password` | Envía la contraseña actual y la nueva del usuario autenticado. |

---

#### Servicios comunes

```txt
services/common/
└── identificationTypeService.ts
```

##### Funciones en `identificationTypeService.ts`

| Función | Endpoint | Descripción |
| --- | --- | --- |
| `getIdentificationTypes()` | `GET /common/identification-types` | Consulta los tipos de identificación activos. **Sin uso actualmente**; se usará en el formulario de Clientes. |

---

#### Servicios del módulo de notificaciones

```txt
services/notifications/
└── notificationService.ts
```

##### Funciones en `notificationService.ts`

```txt
getNotifications()
getUnreadNotificationsCount()
markNotificationAsRead()
markAllNotificationsAsRead()
```

| Función | Endpoint | Descripción |
| --- | --- | --- |
| `getNotifications()` | `GET /notifications` | Consulta las notificaciones del usuario autenticado. |
| `getUnreadNotificationsCount()` | `GET /notifications/unread-count` | Consulta la cantidad de notificaciones no leídas. |
| `markNotificationAsRead(id)` | `PATCH /notifications/:id/read` | Marca una notificación como leída. |
| `markAllNotificationsAsRead()` | `PATCH /notifications/read-all` | Marca todas las notificaciones como leídas. |

---

#### Servicios de Socket.IO

```txt
services/sockets/
└── socketService.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `socketService.ts` | Crea y administra la conexión en tiempo real con Socket.IO usando `VITE_BACKEND_URL`. | Se utiliza en `AuthContext.tsx` (conectar y desconectar) y en `useNotifications.ts` (escuchar notificaciones). |

##### Funciones en `socketService.ts`

```txt
connectSocket()
getSocket()
listenNewNotification()
listenSocketError()
removeNotificationSocketListeners()
disconnectSocket()
```

| Función | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `connectSocket(token)` | Crea la conexión enviando el token y evita conexiones duplicadas. | `AuthContext.tsx` |
| `getSocket()` | Retorna la conexión actual o `null`. | **Sin uso actualmente.** |
| `listenNewNotification(callback)` | Escucha el evento `new_notification`. | `useNotifications.ts` |
| `listenSocketError(callback)` | Escucha el evento `socket_error`. | **Sin uso actualmente.** |
| `removeNotificationSocketListeners()` | Elimina el listener de `new_notification` para evitar duplicados. | `useNotifications.ts` |
| `disconnectSocket()` | Desconecta el socket y deja la instancia en `null`. | `AuthContext.tsx` (logout) |

---

#### Servicios del módulo de usuarios

```txt
services/users/
└── userService.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `userService.ts` | Funciones HTTP para consultar usuarios, cambiar roles, restablecer contraseñas y registrar usuarios por Excel. | Se utiliza desde `useAdminUsers.ts` y `useChangeUserPassword.ts`. |

##### Funciones en `userService.ts`

```txt
getAllUsers()
updateUserRole()
resetUserPassword()
uploadUsersBulk()
```

| Función | Endpoint | Descripción |
| --- | --- | --- |
| `getAllUsers()` | `GET /users` | Consulta todos los usuarios registrados. |
| `updateUserRole(userId, role)` | `PATCH /users/:id/role` | Actualiza el rol de un usuario. |
| `resetUserPassword(userId, data)` | `PATCH /users/:id/password` | Restablece la contraseña de un usuario. La confirmación se valida en el frontend y no se envía al backend. |
| `uploadUsersBulk(file)` | `POST /users/bulk` | Envía el archivo Excel como `multipart/form-data` (campo `file`). Ver Problemas-comunes **P-04**. |

---

### `src/styles/`

Esta carpeta contiene estilos reutilizables que pueden compartirse entre páginas y componentes.

```txt
styles/
├── filterStyles.ts
└── tableStyles.ts
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `filterStyles.ts` | Estilos del contenido interno de los menús de filtros. | Se utiliza en `AdminUsers.tsx`. |
| `tableStyles.ts` | Estilos de elementos de tablas y listados. | Se utiliza en `AdminUsers.tsx`. |

**Responsabilidad principal:**

```txt
Centralizar estilos reutilizables del frontend.
Evitar repetir configuraciones visuales en páginas y componentes.
```

---

#### `filterStyles.ts`

Exporta el objeto `filterStyles`. La búsqueda, la apertura del menú de filtros y la actualización del listado son responsabilidad de `ListToolbar.tsx`.

| Estilo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `filterMenuContent` | Organiza verticalmente los controles del menú de filtros. | Menú de filtros de `AdminUsers.tsx`. |
| `filterDateRow` | Distribuye campos de fecha en una o dos columnas según la pantalla. | **Sin uso actualmente.** Servirá para filtrar préstamos o pagos por fecha. |
| `filterDateInput` | Apariencia de los campos de fecha dentro de los filtros. | **Sin uso actualmente.** |
| `clearFilterButton` | Apariencia del botón para limpiar filtros. | `AdminUsers.tsx`. |

---

#### `tableStyles.ts`

La función `getTableStyles(theme)` recibe el tema de Material UI y toma los colores desde `theme.palette`, para no escribir colores directamente en las páginas.

| Estilo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `rowNumber` | Estilo del número consecutivo de la fila. | Columna `#` de `AdminUsers.tsx`. |
| `primaryActionButton` | Botones de acción principales dentro de la tabla, con fondo suave en `hover`. | Acción **Cambiar rol** de `AdminUsers.tsx`. |
| `neutralActionButton` | Botones de acción secundarios. | Acción **Restablecer contraseña** de `AdminUsers.tsx`. |

---

### `src/theme/`

Esta carpeta contiene la configuración del tema visual de Material UI.

```txt
theme/
└── theme.ts
```

| Color | Valor | Uso |
| --- | --- | --- |
| `primary.main` | `#1f2a7a` | Azul oscuro del logo. |
| `secondary.main` | `#f2d31b` | Amarillo del logo. |
| `background.default` | `#f7f8ff` | Fondo general. |

**Responsabilidad principal:**

```txt
Centralizar la identidad visual del proyecto.
```

---

### `src/template/`

Esta carpeta contiene archivos que generan plantillas descargables desde el frontend.

A diferencia de `utils/`, aquí no se guardan funciones auxiliares pequeñas, sino archivos que construyen documentos completos que el usuario descarga y diligencia.

```txt
template/
└── users/
    └── downloadBulkUsersTemplate.ts
```

#### `downloadBulkUsersTemplate.ts`

| Función | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `downloadBulkUsersTemplate()` | Genera con ExcelJS un archivo Excel con las columnas para registrar usuarios, aplica estilos, comentarios de ayuda y la lista desplegable de roles, y lo descarga con `file-saver`. | Se pasa a `BulkUploadDialog.tsx` desde `AdminUsers.tsx`. |

---

### `src/utils/`

Esta carpeta contiene funciones auxiliares reutilizables.

Los archivos de `utils/` no son componentes, páginas, hooks ni servicios. Su función es centralizar lógica pequeña que puede usarse en diferentes partes del frontend.

#### Estructura

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
└── users/
    └── userRoleUtils.tsx
```

---

#### Utilidades comunes

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `avatarUtils.ts` | Iniciales de un nombre. | **Sin uso actualmente.** |
| `dateUtils.ts` | Formato de fechas. | `NotificationBell.tsx`. |
| `excelUtils.ts` | Conversión de colores al formato de ExcelJS. | `downloadBulkUsersTemplate.ts`. |
| `fileUrl.ts` | Construye la URL completa de un archivo del backend. | **Sin uso actualmente** (venía de los adjuntos de PQR). |
| `fileUtils.ts` | Tamaño legible y descarga de archivos. | `formatFileSize` en `FileInput.tsx` (sin uso); `downloadFile` sin uso. |
| `formatText.ts` | Transformación de textos y etiquetas. | **Sin uso actualmente.** |
| `getErrorMessage.ts` | Mensaje claro a partir de un error de una petición HTTP. | Todos los hooks que llaman al backend. |
| `numberUtils.ts` | Limpieza y formato de números y dinero. | `MoneyInput.tsx`, `NumberInput.tsx`, `useLoanSimulator.ts`. |

##### Funciones en `avatarUtils.ts`

| Función | Descripción |
| --- | --- |
| `getInitials(name)` | Obtiene las iniciales de las dos primeras palabras de un nombre. Si no recibe nombre, retorna `?`. |

##### Funciones en `dateUtils.ts`

| Función | Descripción |
| --- | --- |
| `formatDate(value)` | Convierte una fecha al formato `dd/mm/aaaa` de Colombia. Si no recibe fecha, retorna `____/____/____`. |

##### Funciones en `excelUtils.ts`

| Función | Descripción |
| --- | --- |
| `toExcelColor(color)` | Convierte `#1565c0` en `FF1565C0`, el formato que pide ExcelJS. |

##### Funciones en `fileUrl.ts`

| Función | Descripción |
| --- | --- |
| `buildFileUrl(fileUrl)` | Si la ruta es relativa, le agrega la dirección del backend. |

##### Funciones en `fileUtils.ts`

| Función | Descripción |
| --- | --- |
| `formatFileSize(size)` | Convierte bytes a KB o MB. |
| `downloadFile(fileUrl, fileName)` | Descarga un archivo conservando su nombre; si falla, lo abre en otra pestaña. |

##### Funciones en `formatText.ts`

| Función | Descripción |
| --- | --- |
| `capitalizeText(text)` | Convierte un texto a formato título: `ADMIN` → `Admin`. |
| `getOptionLabel(value, options)` | Devuelve la etiqueta de una opción según su valor. |

##### Funciones en `getErrorMessage.ts`

| Función | Descripción |
| --- | --- |
| `getErrorMessage(error, defaultMessage)` | Sin respuesta del servidor: *"No se pudo conectar con el servidor…"*. Error 500 o mayor: *"Hay un problema con el servidor o la base de datos…"*. En los demás casos usa el `message` que envía el backend. |

##### Funciones en `numberUtils.ts`

| Función | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `cleanNumberInput(value)` | Elimina todo lo que no sea número. | `NumberInput.tsx`, `useLoanSimulator.ts`. |
| `cleanDecimalInput(value)` | Acepta punto o coma como separador, un solo separador y máximo 2 decimales. | `NumberInput.tsx` con `decimal`. |
| `formatNumberInput(value)` | Muestra un número con separador de miles. | `MoneyInput.tsx`. |
| `formatMoney(value)` | Formatea un valor como pesos colombianos. | **Sin uso actualmente** (el simulador usa `formatCurrency`). |

---

#### Utilidades del módulo de préstamos

```txt
utils/loans/
└── loanCalculator.ts
```

##### Funciones en `loanCalculator.ts`

| Función | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `calculateLoanSimulation(form)` | Calcula días totales, periodos de interés, interés total, total a pagar, número de cuotas, valor de la cuota y última cuota. | `useLoanSimulator.ts` |
| `getLoanFrequencyLabel(frequency)` | Devuelve la etiqueta visible de una frecuencia (`DAILY` → Diario). | `LoanSummaryCard.tsx` |
| `formatCurrency(value)` | Formatea un valor como pesos colombianos sin decimales. | `LoanSummaryCard.tsx` |

**Reglas del cálculo:**

```txt
Días por frecuencia: Diario 1, Semanal 7, Quincenal 15, Mensual 30.
Interés simple sobre el monto prestado.
Número de cuotas = días totales ÷ días de la frecuencia de pago, redondeado hacia arriba.
Valores en pesos enteros; la última cuota absorbe la diferencia del redondeo.
```

---

#### Utilidades del módulo de usuarios

```txt
utils/users/
└── userRoleUtils.tsx
```

| Archivo | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `userRoleUtils.tsx` | Define el color, el ícono y el texto de cada rol (`USER`, `ADMIN`). Importa sus íconos directamente de `@mui/icons-material`, no desde `appIcons.ts`. | `UserRoleChip.tsx` |

---

#### Regla de organización de utilidades

```txt
Las funciones reutilizables por varios módulos deben ubicarse en utils/common.
Las funciones exclusivas de un módulo deben ubicarse en utils/nombreModulo.
Los archivos de utils no deben realizar peticiones HTTP.
Los archivos de utils no deben manejar estados de React.
```

---

### `src/validations/`

Esta carpeta contiene los esquemas de validación creados con Yup.

Las validaciones controlan que los datos de los formularios cumplan las reglas antes de enviarse al backend o de ejecutar un cálculo.

#### Estructura

```txt
validations/
│
├── auth/
│   └── authValidation.ts
│
├── loans/
│   └── loanValidation.ts
│
└── users/
    └── userValidation.ts
```

---

#### `authValidation.ts`

```txt
loginSchema
registerSchema
changePasswordSchema
```

| Esquema | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `loginSchema` | Valida correo y contraseña. | `useLogin.ts` |
| `registerSchema` | Valida nombre, correo y contraseña (mínimo 6 caracteres). | `useRegister.ts` |
| `changePasswordSchema` | Valida la contraseña actual, la nueva (mínimo 6 caracteres) y su confirmación. | `useChangePassword.ts` |

---

#### `loanValidation.ts`

| Esquema | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `loanSimulationSchema` | Valida que sean obligatorios el monto prestado, el porcentaje de interés, la frecuencia del interés, el plazo, la unidad del plazo y la frecuencia de pago. | `useLoanSimulator.ts` |

---

#### `userValidation.ts`

| Esquema | Descripción | Uso dentro del proyecto |
| --- | --- | --- |
| `resetUserPasswordSchema` | Valida la nueva contraseña (mínimo 6 caracteres) y que la confirmación coincida, en el restablecimiento hecho por el administrador. | `useChangeUserPassword.ts` |

---

## 4. Archivos principales

### `App.tsx`

Es el componente principal de la aplicación. Solo renderiza `AppRoutes`.

**Responsabilidad principal:**

```txt
Servir como componente base de la aplicación.
```

---

### `main.tsx`

Es el punto de entrada del proyecto React. Renderiza la aplicación con este orden:

```txt
BrowserRouter
└── ThemeProvider + CssBaseline
    └── AuthProvider
        └── App
```

> `BrowserRouter` solo debe estar en `main.tsx`. Ver Problemas-comunes, incidente **#001**.

**Responsabilidad principal:**

```txt
Inicializar la aplicación.
```

---

## 5. Conclusión

Esta estructura permite que PrestApp crezca de forma organizada. Al separar páginas, componentes, servicios, hooks, datos, validaciones y utilidades, cada módulo nuevo (Clientes, Préstamos, Membresía, Pagos y Dashboard) sigue el mismo orden:

```txt
1. interfaces/nombreModulo/   → tipos de datos
2. services/nombreModulo/     → llamadas al backend
3. validations/nombreModulo/  → reglas de los formularios
4. hooks/nombreModulo/        → lógica de la página
5. components/nombreModulo/   → componentes propios (si hacen falta)
6. pages/nombreModulo/        → la vista
7. routes/AppRoutes.tsx y data/menuItems.ts → ruta y opción del menú con sus roles
8. Actualizar este documento
```

Los componentes reutilizables que hoy están **sin uso** quedan listos para esos módulos, y la centralización de íconos en `appIcons.ts` mantiene una representación visual consistente.
