import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    phone: string;
    role: 'CUSTOMER' | 'PROVIDER' | 'BUSINESS' | 'ADMIN';
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => {
                localStorage.setItem('kaamsetu_token', token);
                set({ user, token });
            },
            logout: () => {
                localStorage.removeItem('kaamsetu_token');
                set({ user: null, token: null });
            },
        }),
        {
            name: 'kaamsetu-auth',
        }
    )
);
