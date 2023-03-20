import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AboutCrud, AdminCrud, CategoryCrud, OrdersManagementPage, ProductsCrud, ProfilePage } from "../pages/";

export const AdminRoutes = () => {
  return (

    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<OrdersManagementPage />} />
        <Route path="/Administradores" element={<AdminCrud/>} />
        <Route path= "/Perfil" element = {<ProfilePage/>}/>
        <Route path= "/About" element = {<AboutCrud/>}/>
        <Route path= "/Producto" element = {<ProductsCrud/>}/>
        <Route path= "/Categorias" element = {<CategoryCrud/>}/>

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};