/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/app/lib/api-client";

export interface User {
    id: string;
    email: string;
    role: string;
}

export interface UpdateUserPayload {
    email?: string;
    role?: string;
}

export const SiteService = {
    getUsers: () => http.get<User[]>('/users'),
    updateUser: (id: string, data: UpdateUserPayload) =>
        http.patch<User>(`/users/${id}`, data),

    getAll: () => http.get<any>('/site'),
    getBySiteId: (id: string) => http.get<any>(`/site/${id}`)
};