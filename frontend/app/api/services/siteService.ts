/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/app/lib/api-client";

export const SiteService = {
    getAll: () => http.get<any>('/site'),
    getBySiteId: (id: string) => http.get<any>(`/site/${id}`)
};