import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Error404 from "./pages/Error404.tsx";
import {useEffect} from "react";
import {useAppInitializer} from "./hooks/useAppInitializer.tsx";

function App() {
    const {appInit} = useAppInitializer()
    useEffect(() => {
        appInit()
    });

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
