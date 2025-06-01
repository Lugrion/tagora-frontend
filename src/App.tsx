import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Error404 from "./pages/Error404.tsx";
import {useAppInitializerStore} from "./stores/appInitializer.store.ts";
import {useCacheManager} from "./hooks/useCacheManager.tsx";
import {useEffect} from "react";

function App() {
    const appInit = useAppInitializerStore(set => set.appInit)
    useCacheManager()

    useEffect(() => {
        appInit()
    }, [appInit])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Dashboard/>}/>
                <Route path={"*"} element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
