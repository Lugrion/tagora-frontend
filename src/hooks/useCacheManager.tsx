import {useEffect} from "react";
import {useLabelService} from "./services/useLabelService.tsx";
import {useMemoryService} from "./services/useMemoryService.tsx";
import {useAuthStore} from "../stores/auth.store.ts";

export const useCacheManager = () => {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const {getLabels} = useLabelService()
    const {getMemories} = useMemoryService()

    useEffect(() => {
        if (isAuthenticated) {
            getLabels()
            getMemories()
        }
    }, [isAuthenticated]);
}