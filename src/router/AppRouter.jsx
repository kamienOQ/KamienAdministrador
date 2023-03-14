// import Links from "./Components/Links";
import { Navigate, Route, Routes } from 'react-router-dom';

// Rutas del login
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { AdminRoutes } from "../admin/routes/AdminRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";

import { View } from '../pages/View';
import { Navbar } from '../Components/Navbar'
import { About } from '../pages/About';

export const AppRouter = () => {

  const { status } = useCheckAuth();
  
  return (
      <Navbar>
        <Routes>
          {status === "authenticated" ? (
            <Route path="/*" element={<AdminRoutes />} />
          ) : (
            <Route path="/auth/*" element={<AuthRoutes />} />
          )}

          <Route path="/*" element={<Navigate to="/auth/login" />} />
          <Route path="/add" element={ <ProductRoutes/> }></Route>
          <Route path="/update/id" element={ <ProductRoutes/> }></Route>
          <Route path="/view/id" element={ <View/> }></Route>
          <Route path="/about" element={ <About/> }></Route>
        </Routes>
      </Navbar>
  )
};
Navbar