# Flujos del frontend — PrestApp

Este documento explica, con palabras sencillas, **qué pasa en la aplicación** cada vez que una persona hace algo: entrar, registrarse, simular un préstamo, ver sus notificaciones o administrar usuarios.

Cada flujo tiene tres partes:

- **Qué hace la persona y qué responde el sistema**, paso a paso.
- **Cosas para tener en cuenta.**
- **Archivos que participan**, por si necesitas buscar el código.

| # | Flujo | Quién lo usa |
| --- | --- | --- |
| 1 | [Iniciar sesión](#1-iniciar-sesión) | Todos |
| 2 | [Volver a entrar sin escribir la contraseña](#2-volver-a-entrar-sin-escribir-la-contraseña) | Todos |
| 3 | [Cerrar sesión](#3-cerrar-sesión) | Todos |
| 4 | [Registrarse](#4-registrarse) | Personas nuevas |
| 5 | [Qué puede ver cada rol](#5-qué-puede-ver-cada-rol) | Todos |
| 6 | [Simular un préstamo](#6-simular-un-préstamo) | USER y ADMIN |
| 7 | [Recibir notificaciones](#7-recibir-notificaciones) | Todos |
| 8 | [Administrar usuarios](#8-administrar-usuarios) | Solo ADMIN |
| 9 | [Cambiar mi contraseña](#9-cambiar-mi-contraseña) | Todos |

---

## 1. Iniciar sesión

### Paso a paso

```txt
1. La persona abre la aplicación y ve la pantalla de inicio de sesión.
2. Escribe su correo y su contraseña, y pulsa "Iniciar sesión".
3. El sistema revisa que los dos campos estén llenos y que el correo tenga formato válido.
4. El sistema envía los datos al servidor.
5. Si los datos son correctos, el servidor entrega una "llave" de acceso (token).
6. El sistema guarda esa llave en el navegador y consulta quién es la persona (nombre y rol).
7. La persona entra al Panel principal.
```

### Cosas para tener en cuenta

- Si el correo o la contraseña están mal, aparece el mensaje que envía el servidor.
- Si el servidor está apagado, aparece: *"No se pudo conectar con el servidor. Verifica que el backend esté encendido."*

### Archivos que participan

`pages/auth/Login.tsx` · `hooks/auth/useLogin.ts` · `services/auth/authService.ts` · `context/AuthContext.tsx`

---

## 2. Volver a entrar sin escribir la contraseña

### Paso a paso

```txt
1. La persona ya había iniciado sesión y cierra o recarga la página.
2. Al abrirla de nuevo, el sistema encuentra la llave guardada en el navegador.
3. Mientras la revisa, se ve un círculo de carga.
4. Si la llave sigue siendo válida, la persona entra directo sin escribir nada.
5. Si la llave ya venció, el sistema la borra y muestra la pantalla de inicio de sesión.
```

### Cosas para tener en cuenta

- La llave dura **1 día**. Después hay que volver a iniciar sesión.
- Si alguien con sesión abierta intenta ir a la pantalla de login, el sistema lo devuelve al Panel principal.

### Archivos que participan

`context/AuthContext.tsx` · `routes/PrivateRoute.tsx` · `routes/PublicRoute.tsx`

---

## 3. Cerrar sesión

### Paso a paso

```txt
1. La persona pulsa "Cerrar sesión" en la parte superior de la pantalla.
2. El sistema borra la llave guardada en el navegador.
3. El sistema deja de escuchar notificaciones.
4. La persona vuelve a la pantalla de inicio de sesión.
```

### Archivos que participan

`components/layouts/Header.tsx` · `context/AuthContext.tsx`

---

## 4. Registrarse

### Paso a paso

```txt
1. En la pantalla de inicio de sesión, la persona elige la opción de registrarse.
2. Escribe su nombre completo, su correo y una contraseña.
3. El sistema revisa que todo esté lleno y que la contraseña tenga mínimo 6 caracteres.
4. El sistema envía los datos al servidor y la cuenta queda creada.
5. Aparece un mensaje de éxito.
6. La persona vuelve a la pantalla de inicio de sesión para entrar con su cuenta nueva.
```

### Cosas para tener en cuenta

- Toda cuenta nueva queda con el rol **USER**. Solo un ADMIN puede cambiarlo.
- Si el correo ya está registrado, aparece el mensaje del servidor.

### Archivos que participan

`pages/auth/Register.tsx` · `hooks/auth/useRegister.ts` · `services/auth/authService.ts`

---

## 5. Qué puede ver cada rol

En PrestApp hay dos roles:

| Rol | Quién es | Qué ve en el menú |
| --- | --- | --- |
| **USER** | La persona que presta dinero y administra sus préstamos. | Préstamos → Simulador de préstamos |
| **ADMIN** | El dueño del sistema. | Préstamos → Simulador de préstamos<br>Usuarios → Administrar usuarios |

### Paso a paso

```txt
1. Al entrar, el sistema sabe el rol de la persona.
2. El menú de la izquierda muestra solo las opciones de ese rol.
3. Las opciones del ADMIN no le aparecen a un USER.
```

### Cosas para tener en cuenta

> ⚠️ Hoy el rol solo se revisa en el **menú**. Si un USER escribe a mano la dirección `/users`, la página se abre (aunque no puede ver los datos, porque el servidor se los niega). Está anotado para corregir en `Problemas-comunes.md`, **P-02**.

### Archivos que participan

`data/menuItems.ts` · `components/layouts/SidebarMenu.tsx` · `routes/AppRoutes.tsx`

---

## 6. Simular un préstamo

El simulador sirve para **ver cuánto se pagaría** en un préstamo antes de hacerlo. Solo hace la cuenta: **no guarda nada**.

### Paso a paso

```txt
1. La persona entra a Préstamos → Simulador de préstamos.
2. Llena los datos del préstamo:
     - cuánto va a prestar
     - el porcentaje de interés y cada cuánto se cobra ese interés
     - por cuánto tiempo es el préstamo
     - cada cuánto se paga una cuota
3. Pulsa "Calcular préstamo".
4. El sistema revisa que no falte ningún dato.
5. A la derecha aparece el resumen: interés, total a pagar, número de cuotas y valor de cada cuota.
6. Si cambia cualquier dato, el resumen se borra para no mostrar un cálculo viejo.
7. Con "Limpiar" se borra todo y se empieza de nuevo.
```

### Datos que se piden

| Dato | Ejemplo | Detalle |
| --- | --- | --- |
| Monto prestado | 1.000.000 | Se muestra con puntos de miles mientras se escribe. |
| % Interés | 10 o 2,5 | Acepta decimales con coma o punto. |
| Frecuencia del interés | Mensual | Cada cuánto se cobra ese porcentaje: Diario, Semanal, Quincenal o Mensual. |
| Plazo | 2 | Solo números enteros. |
| Unidad del plazo | Meses | Días, Semanas, Quincenas o Meses. |
| Frecuencia de pago | Quincenal | Cada cuánto se paga una cuota: Diario, Semanal, Quincenal o Mensual. |

### Cómo se hace la cuenta

Para el sistema, **una semana son 7 días, una quincena 15 días y un mes 30 días**.

```txt
1. Se pasa todo el plazo a días.
      2 meses = 60 días

2. Se calcula cuántas veces se cobra el interés en ese tiempo.
      interés mensual (cada 30 días) en 60 días = 2 veces

3. Interés total = monto × porcentaje × veces que se cobra.
      1.000.000 × 10 % × 2 = 200.000

4. Total a pagar = monto + interés.
      1.000.000 + 200.000 = 1.200.000

5. Número de cuotas = días del plazo ÷ días entre cada pago (si sobra, se suma una cuota).
      60 días ÷ 15 (quincenal) = 4 cuotas

6. Valor de la cuota = total a pagar ÷ número de cuotas.
      1.200.000 ÷ 4 = 300.000
```

- El interés se calcula **siempre sobre el monto prestado** (interés simple).
- Todos los valores se manejan en **pesos enteros, sin centavos**.
- Si la división no da exacta, la **última cuota** se ajusta para que la suma cuadre con el total.

### Ejemplos

| Monto | Interés | Plazo | Paga cada | Interés total | Total a pagar | Cuotas | Valor de cada cuota | Última cuota |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $1.000.000 | 10 % mensual | 2 meses | Quincena | $200.000 | $1.200.000 | 4 | $300.000 | $300.000 |
| $100.000 | 10 % mensual | 1 mes | Día | $10.000 | $110.000 | 30 | $3.667 | $3.657 |

En el segundo ejemplo, 110.000 ÷ 30 da 3.666,66. Se redondea a **3.667**, y la última cuota queda en **3.657** para que el total sea exactamente 110.000.

### Archivos que participan

`pages/LoanSimulator.tsx` · `hooks/loans/useLoanSimulator.ts` · `utils/loans/loanCalculator.ts` · `components/loans/LoanSummaryCard.tsx`

---

## 7. Recibir notificaciones

Las notificaciones son avisos del sistema para la persona. Se ven en la **campana** de la parte superior.

### Paso a paso

```txt
1. Al iniciar sesión, el sistema se conecta con el servidor para recibir avisos al instante.
2. La campana muestra cuántos avisos no se han leído.
3. Al abrir la campana, se ve la lista de avisos.
4. Si llega un aviso nuevo mientras la persona está en la aplicación,
   aparece de primero en la lista y el número de la campana sube.
5. La persona puede marcar un aviso como leído, o todos a la vez.
6. Al marcarlos, el número de la campana baja.
```

### Cosas para tener en cuenta

> ⚠️ Es posible que los avisos nuevos **no aparezcan al instante** y solo se vean al recargar la página. Está anotado para revisar en `Problemas-comunes.md`, **P-03**.

### Archivos que participan

`components/common/NotificationBell.tsx` · `hooks/notifications/useNotifications.ts` · `services/notifications/notificationService.ts` · `services/sockets/socketService.ts`

---

## 8. Administrar usuarios

Solo el **ADMIN** puede entrar a **Usuarios → Administrar usuarios**.

### 8.1 Ver la lista de usuarios

```txt
1. El ADMIN abre Administrar usuarios.
2. Ve una tabla con el nombre, el correo y el rol de cada persona.
3. Puede buscar por texto o filtrar por rol (USER o ADMIN).
4. Si no hay usuarios, aparece un mensaje que lo indica.
```

### 8.2 Cambiar el rol de una persona

```txt
1. En la fila de la persona, el ADMIN pulsa "Cambiar rol".
2. Se abre una ventana con el rol actual.
3. El ADMIN elige el nuevo rol y guarda.
4. La tabla se actualiza y aparece "Rol actualizado correctamente."
```

### 8.3 Restablecer la contraseña de una persona

Sirve cuando alguien olvida su contraseña.

```txt
1. En la fila de la persona, el ADMIN pulsa "Restablecer contraseña".
2. Escribe la nueva contraseña dos veces.
3. El sistema revisa que tenga mínimo 6 caracteres y que las dos coincidan.
4. Se guarda y aparece un mensaje de confirmación.
5. El ADMIN le comunica la nueva contraseña a la persona.
```

### 8.4 Registrar varias personas con un Excel

```txt
1. El ADMIN pulsa "Carga masiva de usuarios".
2. En la ventana, descarga la plantilla de Excel.
3. Llena la plantilla con una fila por persona: nombre, correo, contraseña y rol.
4. Sube el archivo en la misma ventana.
5. El sistema revisa todas las filas:
     - Si alguna tiene un error, NO se registra a nadie y se muestra
       en qué fila y columna está cada error, para corregirlo.
     - Si todo está bien, se registran todas las personas, aparece
       "Carga masiva exitosa" y la tabla se actualiza.
```

### Cosas para tener en cuenta

- La carga masiva es **todo o nada**: o se registran todas las filas, o ninguna.
- La plantilla ya trae una lista desplegable para escoger el rol.

### Archivos que participan

`pages/users/AdminUsers.tsx` · `hooks/users/useAdminUsers.ts` · `hooks/users/useChangeUserPassword.ts` · `services/users/userService.ts` · `components/common/BulkUploadDialog.tsx` · `template/users/downloadBulkUsersTemplate.ts`

---

## 9. Cambiar mi contraseña

### Paso a paso

```txt
1. La persona pulsa el ícono de configuración (engranaje) en la parte superior.
2. Elige "Cambiar contraseña".
3. Escribe su contraseña actual, la nueva y la confirmación.
4. El sistema revisa que la nueva tenga mínimo 6 caracteres, que sea diferente a la actual
   y que coincida con la confirmación.
5. Se guarda y aparece un mensaje con el resultado.
```

### Archivos que participan

`components/users/SettingsMenu.tsx` · `pages/users/ChangePassword.tsx` · `hooks/auth/useChangePassword.ts`
