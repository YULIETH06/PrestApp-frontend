import { io, type Socket } from "socket.io-client";
import type { Notification } from "../../interfaces/notifications/notification.interface";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

// Evita conexiones duplicadas
let socket: Socket | null = null;

// Crea o retorna la conexión activa con Socket.IO
export const connectSocket = (token: string): Socket => {
    if (socket?.connected) {
        return socket;
    }

    socket = io(SOCKET_URL, {
        auth: {
            token,
        },
    });

    return socket;
};

// Retorna la instancia actual del socket
export const getSocket = (): Socket | null => {
    return socket;
};

// Escucha cuando llega una nueva notificación en tiempo real
export const listenNewNotification = (
    callback: (notification: Notification) => void
): void => {
    socket?.on("new_notification", callback);
};

// Escucha errores enviados por el backend
export const listenSocketError = (
    callback: (error: { message: string }) => void
): void => {
    socket?.on("socket_error", callback);
};

// Limpia el listener de notificaciones para evitar duplicados
export const removeNotificationSocketListeners = (): void => {
    socket?.off("new_notification");
};

// Desconecta el socket cuando el usuario cierra sesión
export const disconnectSocket = (): void => {
    socket?.disconnect();
    socket = null;
};