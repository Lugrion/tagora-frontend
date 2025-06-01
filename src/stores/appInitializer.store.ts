import {create} from "zustand";
import {ProfileDTO} from "../types/auth";
import {useAuthStore} from "./auth.store.ts";

const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;

interface AppInitState {
    isAppInitialized: boolean;
    appInit: () => void;
    getProfile: () => Promise<ProfileDTO>;
}

export const useAppInitializerStore = create<AppInitState>((set, get) => ({
    isAppInitialized: false,

    appInit: async () => {
        set({isAppInitialized: false});

        console.log("App initializing...");
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const res = await get().getProfile()
                if (res) {
                    console.log(res.username);
                    setIsAuthenticated(true);
                    console.log("[appInit] You should call the API")
                } else {
                    console.log("[appInit] Bad profile");
                }
            } catch (error) {
                setIsAuthenticated(false);
                localStorage.removeItem("accessToken")
                console.error("[appInit] Bad API check", error);
            }
        } else {
            console.log("[appInit] No JWT exist");
        }

        set({isAppInitialized: true});
    },

    getProfile: async (): Promise<ProfileDTO> => {
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
        console.log(`[AuthStore] Fetching profile:`, response);
        return response as ProfileDTO;
    },
}))