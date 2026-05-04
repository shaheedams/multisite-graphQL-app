import { useState, useCallback, useEffect } from 'react';

interface UseFetchOptions<T> {
    immediate?: boolean;
    dependencies?: unknown[];
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export function useFetch<T, A extends unknown[]>(
    apiMethod: (...args: A) => Promise<T>,
    options: UseFetchOptions<T> = {}
) {
    const { immediate = true, dependencies = [], onSuccess, onError } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (...args: A): Promise<T> => {
        setLoading(true);
        setError(null);

        try {
            const result = await apiMethod(...args);
            setData(result);
            if (onSuccess) onSuccess(result);
            return result;
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'An error occurred';
            setError(msg);
            const errorObj = err instanceof Error ? err : new Error(msg);
            if (onError) onError(errorObj);
            throw errorObj;
        } finally {
            setLoading(false);
        }
    }, [apiMethod]);

    useEffect(() => {
        if (immediate) {
            (execute as () => Promise<T>)().catch(() => { });
        }
    }, dependencies);

    return { data, loading, error, execute, setData };
}