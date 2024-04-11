import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AboutCrud, AdminCrud, AttibutesCrud, OrdersManagementPage, ProductsCrud, ProfilePage, CategoriesCrud } from "../pages/";
import { useState } from "react";
import BlockedPage from "./BlockedPage";
import BlockedPageHeader from "./BlockedPageHeader";
import { getCurrentUser } from "../../firebase/providers";
import { Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth";
export const AdminRoutes = () => {
  const [user, setUser] = useState(undefined)
  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(startLogout())
  }
  useState(async () => {
    setUser(await getCurrentUser())
  }, [])
  if (!user) {
    return (
      <div>
        <CircularProgress color="inherit" sx={{ marginTop: "25%", marginLeft: "50%" }} />
        <Button onClick={logOut}> Cancelar</Button>
      </div>
    )
  }
  return (

    <>
      <div>
        {user.habilitado ? <Navbar /> : <BlockedPageHeader />}
        <Routes>
          <Route path="/" element={user.habilitado ? <OrdersManagementPage /> : <BlockedPage />} />
          <Route path="/Administradores" element={user.habilitado ? <AdminCrud /> : <BlockedPage />} />
          <Route path="/Perfil" element={user.habilitado ? <ProfilePage /> : <BlockedPage />} />
          <Route path="/About" element={user.habilitado ? <AboutCrud /> : <BlockedPage />} />
          <Route path="/Producto" element={user.habilitado ? <ProductsCrud /> : <BlockedPage />} />
          <Route path="/Categorias" element={user.habilitado ? <CategoriesCrud /> : <BlockedPage />} />
          <Route path="/Atributos" element={user.habilitado ? <AttibutesCrud /> : <BlockedPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};