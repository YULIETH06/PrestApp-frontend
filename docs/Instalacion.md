# Instalación del frontend — PrestApp

Este documento tiene dos partes:

| Parte | Contenido |
| --- | --- |
| [Parte 1](#parte-1--configuración-del-proyecto-clonado) | Cómo configurar y ejecutar el frontend después de clonar el repositorio. |
| [Parte 2](#parte-2--dependencias-instaladas-en-el-frontend) | Registro de las dependencias instaladas durante el desarrollo y para qué se usa cada una en PrestApp. |

---

# Parte 1 — Configuración del proyecto clonado

Esta guía explica cómo configurar y ejecutar el frontend localmente después de clonar el repositorio.

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

* Node.js
* npm
* Git

También debe estar funcionando el **backend de PrestApp** en el puerto `4000`. Ver `PrestApp-backend/docs/Instalacion.md`.

---

## 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
```

### Descripción

Este comando descarga el proyecto frontend desde el repositorio remoto hacia el equipo local.

---

## 2. Instalar dependencias

```bash
npm install
```

### Descripción

Este comando instala automáticamente todas las dependencias definidas en el archivo:

```txt
package.json
```

Incluyendo:

* React y React DOM
* Vite
* TypeScript
* Axios
* React Router DOM
* Material UI y sus íconos
* Socket.IO Client
* Yup
* ExcelJS y File Saver
* ESLint
* Tipados de TypeScript

El detalle de cada una está en la [Parte 2](#parte-2--dependencias-instaladas-en-el-frontend).

---

## 3. Configurar variables de entorno

Crear un archivo en la raíz del proyecto frontend:

```txt
.env
```

Dentro del archivo `.env`, agregar las siguientes variables:

```env
VITE_API_URL=http://localhost:4000/api
VITE_BACKEND_URL=http://localhost:4000
```

### Descripción

Estas variables permiten conectar el frontend con el backend local.

| Variable | Archivo donde se usa | Para qué se utiliza |
| --- | --- | --- |
| `VITE_API_URL` | `src/api/axios.ts` | URL base de todas las peticiones HTTP a la API del backend (login, usuarios, notificaciones…). |
| `VITE_BACKEND_URL` | `src/services/sockets/socketService.ts` | Dirección del servidor para conectar Socket.IO y recibir las notificaciones en tiempo real. |

Es importante que el backend esté ejecutándose en el puerto:

```txt
4000
```

para que el frontend pueda conectarse correctamente.

> En Vite, las variables deben empezar por `VITE_` para que el frontend pueda leerlas. Si cambias el `.env`, detén y vuelve a ejecutar `npm run dev`.

---

## 4. Iniciar el frontend

### Comando

```bash
npm run dev
```

### Descripción

Este comando inicia el servidor de desarrollo del frontend.

Generalmente, Vite ejecuta el proyecto en una dirección similar a:

```txt
http://localhost:5173
```

---

## 5. Abrir el proyecto en el navegador

Después de ejecutar el comando anterior, la terminal mostrará una URL local.

Ejemplo:

```txt
http://localhost:5173
```

Se debe abrir esta dirección en el navegador. La primera pantalla es el **Login**; desde allí se puede ir a **Registro** para crear un usuario.

> Los usuarios nuevos quedan con rol `USER`. El primer `ADMIN` se crea desde la base de datos (ver `PrestApp-backend/docs/Instalacion.md`).

---

## Scripts disponibles

| Script | Comando que ejecuta | Descripción |
| --- | --- | --- |
| `npm run dev` | `vite` | Ejecuta el frontend en desarrollo. |
| `npm run build` | `tsc -b && vite build` | Revisa los tipos de TypeScript y genera la versión de producción en `dist/`. |
| `npm run lint` | `eslint .` | Revisa el código con ESLint. |
| `npm run preview` | `vite preview` | Previsualiza el proyecto compilado. |

> `npm run build` sirve también para comprobar que no hay errores de TypeScript antes de hacer un commit.

---

# Parte 2 — Dependencias instaladas en el frontend

Esta sección registra las principales dependencias instaladas durante el desarrollo del frontend de **PrestApp**, explicando el propósito de cada una dentro del proyecto.

---

## 1. Creación del proyecto con Vite

Para iniciar el proyecto frontend se utilizó **Vite**, una herramienta que permite crear aplicaciones React de forma rápida, ligera y optimizada para desarrollo.

### Comando ejecutado

```bash
npm create vite@latest .
```

### Tecnologías seleccionadas

```txt
React
TypeScript
```

### ¿Para qué se utilizó?

Vite permitió crear la base inicial del proyecto con React y TypeScript. Esta configuración facilita trabajar con componentes, tipado estático y recarga rápida durante el desarrollo.

---

## 2. Instalación de dependencias iniciales del proyecto

Después de crear el proyecto, se instalaron las dependencias base generadas por Vite.

### Comando ejecutado

```bash
npm install
```

### ¿Para qué se utilizó?

Este comando instaló los paquetes definidos inicialmente en `package.json` (React, React DOM, Vite, TypeScript y ESLint), permitiendo ejecutar el proyecto React.

---

## 3. Instalación de Axios y React Router DOM

Se instalaron las dependencias necesarias para conectar el frontend con el backend y manejar la navegación interna de la aplicación.

### Comando ejecutado

```bash
npm install axios react-router-dom
```

### Dependencias instaladas

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `axios` | Realiza las peticiones HTTP al backend: iniciar sesión, registrarse, consultar el perfil, administrar usuarios y consultar notificaciones. |
| `react-router-dom` | Crea las rutas públicas y privadas de la aplicación. |

### ¿Para qué se utilizó Axios?

Axios se configuró en el archivo:

```txt
src/api/axios.ts
```

Su función principal es centralizar la conexión con el backend mediante una `baseURL` (`VITE_API_URL`), evitando repetir la URL del servidor en cada petición.

También se configuró un interceptor para enviar automáticamente el token JWT en las peticiones protegidas:

```tsx
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

Esto permite que el frontend se comunique con las rutas protegidas del backend sin agregar manualmente el token en cada petición.

### ¿Para qué se utilizó React Router DOM?

React Router DOM se utilizó para manejar la navegación entre vistas sin recargar la página.

Rutas implementadas:

```txt
/                            → Login
/register                    → Register
/dashboard                   → Dashboard
/dashboard/loans/simulator   → Simulador de préstamos
/users                       → Administrar usuarios (ADMIN)
/change-password             → Cambiar contraseña
```

También permitió implementar las rutas protegidas mediante `PrivateRoute` y `PublicRoute`, y mostrar el contenido de cada página con `Outlet` dentro del `DashboardLayout`.

---

## 4. Instalación de Material UI

Se instaló **Material UI** para construir una interfaz moderna, profesional y reutilizable.

### Comando ejecutado

```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Dependencias instaladas

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `@mui/material` | Proporciona componentes visuales como `Box`, `Button`, `Typography`, `AppBar`, `Toolbar`, `Avatar`, `List`, `Collapse`, `Dialog`, `Table`, entre otros. |
| `@emotion/react` | Librería necesaria para que Material UI maneje sus estilos internos y dinámicos. |
| `@emotion/styled` | Permite el funcionamiento del sistema de estilos de Material UI. |

### ¿Para qué se utilizó Material UI?

Material UI se utilizó para diseñar todas las interfaces del frontend, entre ellas:

```txt
Login
Register
Header
SidebarMenu
DashboardLayout
Dashboard
LoanSimulator
AdminUsers
ChangePassword
```

Además, se definió el tema global en `src/theme/theme.ts` con los colores de PrestApp (azul `#1f2a7a` y amarillo `#f2d31b`) y se trabajó con el sistema `sx` para escribir los estilos sobre los componentes.

Ejemplo:

```tsx
<Box sx={style.container}>
  Contenido
</Box>
```

---

## 5. Instalación de íconos de Material UI

Para mejorar visualmente el menú lateral, el header y los botones del sistema, se instalaron los íconos oficiales de Material UI.

### Comando ejecutado

```bash
npm install @mui/icons-material
```

### Dependencia instalada

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `@mui/icons-material` | Permite usar íconos visuales dentro de los componentes del sistema. |

### Íconos utilizados en el header y el menú

| Ícono | Archivo | Uso |
| --- | --- | --- |
| `MenuIcon` | `Header.tsx` | Abrir y cerrar el menú lateral. |
| `PersonIcon` | `Header.tsx` | Representar al usuario cuando no hay inicial disponible. |
| `LogoutIcon` | `Header.tsx` | Acompañar el botón de cerrar sesión. |
| `FolderIcon` | `SidebarMenu.tsx` | Representar módulos cerrados del menú. |
| `FolderOpenIcon` | `SidebarMenu.tsx` | Representar módulos abiertos del menú. |
| `ExpandLessIcon` / `ExpandMoreIcon` | `SidebarMenu.tsx` | Indicar que una sección puede contraerse o desplegarse. |
| `ArticleIcon` | `SidebarMenu.tsx` | Representar submódulos. |
| `RadioButtonUncheckedIcon` | `SidebarMenu.tsx` | Representar las opciones dentro de un submódulo. |

### Íconos centralizados

Los íconos de acciones (guardar, cancelar, limpiar, buscar, filtrar, actualizar, cargar, configuración, cambiar contraseña…) no se importan en cada página: se centralizan en:

```txt
src/icons/appIcons.ts
```

y los usan componentes como `ActionButton.tsx` e `IconActionButton.tsx`. Ver `Arquitectura.md`, sección `src/icons/`.

---

## 6. Instalación de ExcelJS y File Saver

Se instalaron dependencias para generar y descargar archivos de Excel desde el frontend, para la funcionalidad de **carga masiva de usuarios**.

### Comando ejecutado

```bash
npm install exceljs file-saver
```

### Dependencias instaladas

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `exceljs` | Crea archivos Excel desde el frontend: hojas, columnas, estilos, comentarios y listas desplegables. |
| `file-saver` | Descarga en el navegador los archivos generados desde el frontend. |

### Instalación de tipos para File Saver

Como el proyecto trabaja con TypeScript, también se instaló el paquete de tipos de `file-saver` para evitar errores de tipado.

### Comando ejecutado

```bash
npm install -D @types/file-saver
```

### ¿Para qué se utilizó ExcelJS?

ExcelJS se utilizó para construir la plantilla de Excel llamada:

```txt
plantilla_carga_masiva_usuarios.xlsx
```

Esta plantilla permite registrar usuarios de forma masiva con las siguientes columnas:

```txt
nombre | correo | contraseña | rol
```

Además, se aplicaron estilos a los encabezados con colores del tema de Material UI, comentarios con las reglas de cada columna y una lista desplegable para el rol (`USER` o `ADMIN`).

Archivo relacionado dentro del proyecto:

```txt
src/template/users/downloadBulkUsersTemplate.ts
```

### ¿Para qué se utilizó File Saver?

File Saver se utilizó para descargar automáticamente la plantilla generada por ExcelJS. Después de construir el archivo, se genera un `Blob` y se descarga mediante `saveAs`.

```tsx
saveAs(blob, "plantilla_carga_masiva_usuarios.xlsx");
```

---

## 7. Instalación de XLSX

Se instaló **XLSX** para trabajar con archivos de Excel desde el frontend.

### Comando ejecutado

```bash
npm install xlsx
```

### Dependencia instalada

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `xlsx` | Leer e interpretar archivos Excel desde el frontend. |

### ¿Para qué se utilizó XLSX?

> **Actualmente no se usa.** Ningún archivo de `src/` importa `xlsx`. En PrestApp el archivo Excel de la carga masiva se envía tal cual al backend, y es el backend quien lo lee y valida.

Se conserva por si más adelante se quiere leer un Excel en el navegador antes de enviarlo (por ejemplo, para mostrar una vista previa). Si no se llega a usar, se puede desinstalar con:

```bash
npm uninstall xlsx
```

---

## 8. Instalación de Socket.IO Client

Se instaló **Socket.IO Client** para permitir la comunicación en tiempo real entre el frontend y el backend. En PrestApp se usa para las **notificaciones**.

### Comando ejecutado

```bash
npm install socket.io-client
```

### Dependencia instalada

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `socket.io-client` | Establece una conexión en tiempo real con el backend para recibir notificaciones sin recargar la página. |

### ¿Para qué se utilizó Socket.IO Client?

La conexión se centralizó en el archivo:

```txt
src/services/sockets/socketService.ts
```

usando la variable de entorno:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Funciones principales implementadas

| Función | Propósito |
| --- | --- |
| `connectSocket(token)` | Crea o retorna la conexión activa, enviando el token JWT para autenticar al usuario. |
| `getSocket()` | Retorna la instancia actual del socket. |
| `listenNewNotification(callback)` | Escucha las nuevas notificaciones recibidas en tiempo real. |
| `listenSocketError(callback)` | Escucha errores enviados por el backend. |
| `removeNotificationSocketListeners()` | Limpia el listener de notificaciones para evitar eventos duplicados. |
| `disconnectSocket()` | Desconecta el socket cuando el usuario cierra sesión. |

### Ejemplo de conexión con Socket.IO

```tsx
socket = io(SOCKET_URL, {
  auth: {
    token,
  },
});
```

Con el token, el backend identifica al usuario y lo une a su sala personal `user_<id>`, para enviarle solo sus notificaciones.

### Eventos utilizados

| Evento | Uso dentro del proyecto |
| --- | --- |
| `new_notification` | Recibe en tiempo real una nueva notificación del usuario. |
| `socket_error` | Recibe errores enviados por el backend. |

### Dónde se usa

| Archivo | Uso |
| --- | --- |
| `src/context/AuthContext.tsx` | Conecta el socket al iniciar sesión y lo desconecta al cerrarla. |
| `src/hooks/notifications/useNotifications.ts` | Escucha `new_notification` y actualiza la campana y el contador. |
| `src/components/common/NotificationBell.tsx` | Muestra las notificaciones en el header. |

> Ver `Problemas-comunes.md`, **P-03**: el listener puede registrarse antes de que exista la conexión.

---

## 9. Instalación de Yup

Se instaló **Yup** para facilitar la validación de formularios dentro del frontend.

### Comando ejecutado

```bash
npm install yup
```

### Dependencia instalada

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `yup` | Define esquemas de validación: campos obligatorios, formato de correo, longitud mínima de contraseña, coincidencia de contraseñas, entre otras reglas. |

### ¿Para qué se utilizó Yup?

Yup valida los datos ingresados por el usuario antes de enviarlos al backend o de hacer un cálculo. Los esquemas están en `src/validations/`:

| Formulario | Esquema | Archivo |
| --- | --- | --- |
| Login | `loginSchema` | `validations/auth/authValidation.ts` |
| Registro | `registerSchema` | `validations/auth/authValidation.ts` |
| Cambiar contraseña | `changePasswordSchema` | `validations/auth/authValidation.ts` |
| Simulador de préstamos | `loanSimulationSchema` | `validations/loans/loanValidation.ts` |
| Restablecer contraseña (ADMIN) | `resetUserPasswordSchema` | `validations/users/userValidation.ts` |

---

## 10. Instalación de tipos de Node

Como el proyecto trabaja con TypeScript, también se instaló el paquete de tipos de Node.js.

### Comando ejecutado

```bash
npm install -D @types/node
```

### Dependencia instalada

| Dependencia | Uso dentro del proyecto |
| --- | --- |
| `@types/node` | Agrega soporte de tipos de Node.js en el proyecto TypeScript. |

### ¿Para qué se utilizó?

Permite que TypeScript reconozca los tipos de Node.js en archivos de configuración como `vite.config.ts`.

---

# Resumen de dependencias instaladas

| Dependencia | Comando | Propósito en PrestApp |
| --- | --- | --- |
| Vite | `npm create vite@latest .` | Crear el proyecto frontend con React y TypeScript. |
| Dependencias base | `npm install` | Instalar los paquetes iniciales del proyecto. |
| Axios | `npm install axios react-router-dom` | Realizar peticiones HTTP al backend con el token JWT. |
| React Router DOM | `npm install axios react-router-dom` | Manejar rutas públicas y privadas. |
| Material UI | `npm install @mui/material @emotion/react @emotion/styled` | Construir las interfaces y el tema de PrestApp. |
| MUI Icons | `npm install @mui/icons-material` | Íconos del header, el menú y las acciones. |
| ExcelJS | `npm install exceljs file-saver` | Crear la plantilla Excel de carga masiva de usuarios. |
| File Saver | `npm install exceljs file-saver` | Descargar la plantilla generada. |
| Tipos de File Saver | `npm install -D @types/file-saver` | Soporte de TypeScript para `file-saver`. |
| XLSX | `npm install xlsx` | Leer Excel en el navegador. **Sin uso actualmente.** |
| Socket.IO Client | `npm install socket.io-client` | Notificaciones en tiempo real. |
| Yup | `npm install yup` | Validar formularios mediante esquemas. |
| Tipos de Node | `npm install -D @types/node` | Soporte de tipos de Node.js en TypeScript. |

---

# Conclusión

Con estas herramientas el frontend de PrestApp tiene la base para crecer: Vite inicia el proyecto con React y TypeScript; Axios se comunica con el backend enviando el token; React Router DOM maneja la navegación y protege las rutas; Material UI y sus íconos dan la interfaz y la identidad visual; ExcelJS y File Saver generan la plantilla de carga masiva; Socket.IO Client entrega las notificaciones en tiempo real; y Yup valida los formularios, incluido el simulador de préstamos.

Cuando se instale una dependencia nueva (por ejemplo, para el calendario de cuotas o las gráficas del Dashboard), se agrega aquí como una sección nueva con su comando, su uso y el archivo donde se utiliza, y se suma al resumen.
