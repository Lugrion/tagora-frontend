import {LoginRequest, ProfileDTO, RegisterRequest} from "../../types/auth";
import {useAuthStore} from "../../stores/auth.store.ts";

export const useUserService = () => {
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

    const login = async (loginRequest: LoginRequest) => {
        const res = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest),
        })

        if (!res.ok) {
            throw new Error(`Failed to login (status ${res.status})`);
        }

        const response = await res.json();

        localStorage.setItem('accessToken', response.accessToken);
        setIsAuthenticated(true)

        console.log(`[AuthService] Login:`, response);
        return response;
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    }

    const register = async (registerRequest: RegisterRequest) => {
        const res = await fetch("/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerRequest),
        })

        if (!res.ok) {
            throw new Error(`Failed to register (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[AuthService] Register:`, response);
        return response;
    }

    const getProfile = async (): Promise<ProfileDTO> => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            throw new Error('No access token found');
        }
        const res = await fetch("/api/profile", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch profile (status ${res.status})`);
        }

        const response = await res.json();
        console.log(`[userService] Fetching profile:`, response);
        return response as ProfileDTO;
    }

    return {login, logout, register, getProfile};
}