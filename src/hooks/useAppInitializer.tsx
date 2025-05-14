import {useUserService} from "./services/useUserService.tsx";
import {useAuthStore} from "../stores/auth.store.ts";

export const useAppInitializer = () => {
    // Manages App Init checks:
    // Check JWT Storage -> Validate   (Check expiration + Check Endpoint) -> Change Auth
    // If JWT is NOT VALID -> Show Mock App with examples
    // If JWT is VALID -> Fetch the cache data the moment the JWT token is valid

    // Maybe use getUser endpoint as test? or getLabels getMemories?

    const {getProfile} = useUserService();
    const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated);

    const appInit = async () => {
        console.log("App initializing...");
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const res = await getProfile();
                if (res) {
                    console.log(res.username);
                    setIsAuthenticated(true);
                }
            } catch (error) {
                localStorage.removeItem("accessToken")
                console.error("[appInit]", error);
            }
        }
    }

    return {appInit};
}