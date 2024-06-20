import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import GamePage from "./GamePage";
import WinSite from "./WinSite";

function AllRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<GamePage />}/>
                <Route exact path={'/win/:player'} element={<WinSite />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes;