import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Logs from "./pages/logs";

const AppRoutes = () => {
   return (
       <Routes>
           <Route path="/" element={<Home />} />
           <Route path="/logs" element={<Logs />} />
       </Routes>
   );
}

export default AppRoutes;