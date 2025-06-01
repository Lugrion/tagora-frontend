import {useLabelsStore} from "../stores/label.store.ts";
import {useMemoriesStore} from "../stores/memory.store.ts";
import {useAuthStore} from "../stores/auth.store.ts";
import {useEffect} from "react";
import {useAppInitializerStore} from "../stores/appInitializer.store.ts";

export const useCacheManager = () => {
    const resetCacheLabelsMock = useLabelsStore.getState().resetCacheLabelsMock;
    const resetCacheMemoriesMock = useMemoriesStore.getState().resetCacheMemoriesMock;
    const resetCacheLabelsAPI = useLabelsStore.getState().resetCacheLabelsAPI;
    const resetCacheMemoriesAPI = useMemoriesStore.getState().resetCacheMemoriesAPI;

    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const isAppInitialized = useAppInitializerStore(state => state.isAppInitialized);

    useEffect(() => {
        if (isAppInitialized) {
            if (isAuthenticated) {
                resetCacheLabelsAPI();
                resetCacheMemoriesAPI();
                console.log("[cacheManager] Call API")
            } else {
                resetCacheLabelsMock()
                resetCacheMemoriesMock()
                console.log("[cacheManager] Call Mocks")
            }
        }
    }, [isAuthenticated, isAppInitialized, resetCacheLabelsAPI, resetCacheMemoriesAPI, resetCacheLabelsMock, resetCacheMemoriesMock]);
}