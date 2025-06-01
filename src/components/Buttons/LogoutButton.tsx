import {useAuthStore} from "../../stores/auth.store.ts";

export const LogoutButton = () => {
    const logout = useAuthStore(set => set.logout);

    return (
        <button className={"logout-button"} onClick={logout}>Logout</button>
    )
}