'use client';

import { useFetch } from "../utils/customHooks/useFetch";
import { SiteService } from "./services/siteService";

// import { useFetch } from "@/hooks/useFetch";
// import { SiteService, User } from "@/services/user-service";

export default function UserPage() {
    // 1. Calling GET users automatically on mount
    const { data: users, loading, error } = useFetch(SiteService.getUsers);

    // 2. Setting up an update call (not immediate)
    const { execute: runUpdate, loading: isUpdating } = useFetch(
        () => SiteService.updateUser('123', { role: 'ADMIN' }),
        { immediate: false, onSuccess: () => alert('Updated!') }
    );

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <h1>Users</h1>
            {users?.map((user) => (
                <div key={user.id}>
                    {user.email} - {user.role}
                </div>
            ))}

            <button onClick={() => runUpdate()} disabled={isUpdating}>
                {isUpdating ? 'Promoting...' : 'Promote User 123'}
            </button>
        </main>
    );
}