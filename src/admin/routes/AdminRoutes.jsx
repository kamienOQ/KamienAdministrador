import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { AdminCrud, CategoryCrud, OrdersManagementPage, ProductsCrud, ProfilePage,AttributeCrud } from "../pages/";

export const AdminRoutes = () => {
  return (

    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<OrdersManagementPage />} />
        <Route path="/Administradores" element={<AdminCrud/>} />
        <Route path= "/Perfil" element = {<ProfilePage/>}/>
        <Route path= "/Producto" element = {<ProductsCrud/>}/>
        <Route path= "/Categorias" element = {<CategoryCrud/>}/>        
        <Route path= "/attributes" element = {<AttributeCrud/>}/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};