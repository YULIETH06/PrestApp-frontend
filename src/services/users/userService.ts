import api from "../../api/axios";

import type {
  BulkUploadResponse,
} from "../../interfaces/users/bulkUpload.interface";

import type {
  ResetUserPasswordData,
  User,
  UserRole,
} from "../../interfaces/users/user.interface";

// Obtiene todos los usuarios del sistema. Endpoint usado por ADMIN.
export const getAllUsers = async (): Promise<{
  message: string;
  users: User[];
}> => {
  const response = await api.get<{
    message: string;
    users: User[];
  }>("/users");

  return response.data;
};

// Actualiza el rol de un usuario. Endpoint usado por ADMIN.
export const updateUserRole = async (
  userId: number,
  role: UserRole
) => {
  const response = await api.patch(
    `/users/${userId}/role`,
    {
      role,
    }
  );

  return response.data;
};

// Restablece la contraseña de un usuario. Endpoint usado por ADMIN.
export const resetUserPassword = async (
  userId: number,
  data: ResetUserPasswordData
) => {
  const response = await api.patch(
    `/users/${userId}/password`,
    data
  );

  return response.data;
};

// Registra usuarios mediante carga masiva desde archivo Excel. Endpoint usado por ADMIN.
export const uploadUsersBulk = async (
  file: File
): Promise<BulkUploadResponse<User>> => {
  const formData = new FormData();

  formData.append(
    "file",
    file
  );

  const response = await api.post<
    BulkUploadResponse<User>
  >(
    "users/bulk",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};