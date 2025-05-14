import {useUserService} from "../../hooks/services/useUserService.tsx";

export const LogoutButton = () => {
    const {logout} = useUserService()

    return (
        <button onClick={logout}>Logout</button>
    )
}