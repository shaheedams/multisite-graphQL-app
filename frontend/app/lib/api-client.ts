const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7700/api';

async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'API Request Failed');
    }

    return response.json();
}

export const http = {
    get: <T>(url: string) => request<T>(url, { method: 'GET' }),
    post: <T>(url: string, body: unknown) =>
        request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
    patch: <T>(url: string, body: unknown) =>
        request<T>(url, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(url: string) => request<T>(url, { method: 'DELETE' }),
};