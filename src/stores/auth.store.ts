import {create} from 'zustand';
import {LoginRequest, LoginResponse, RegisterRequest} from "../types/auth";

interface AuthState {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    register: (registerRequest: RegisterRequest) => Promise<string>;
    login: (loginRequest: LoginRequest) => Promise<LoginResponse>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,

    setIsAuthenticated: (isAuthenticated: boolean) => {
        set({isAuthenticated});
    },

    register: async (registerRequest: RegisterRequest): Promise<string> => {
        const res = await fetch("/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerRequest),
        });

        if (!res.ok) {
            throw new Error(`Failed to register (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[AuthStore] Register:`, response);
        return response;
    },

    login: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
        const res = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        });

        if (!res.ok) {
            throw new Error(`Failed to login (status ${res.status})`);
        }

        const response = await res.json();

        localStorage.setItem('accessToken', response.accessToken);
        set({isAuthenticated: true});

        console.log(`[AuthStore] Login:`, response);
        return response as LoginResponse;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        set({isAuthenticated: false});
    }
}));
