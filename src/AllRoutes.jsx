import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import GamePage from "./Pages/GamePage/GamePage";
import WinPage from "./Pages/WinPage/WinPage";

function AllRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path={'/'} element={<GamePage />}/>
                <Route exact path={'/win/:player'} element={<WinPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes;