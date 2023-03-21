import { Navigate, Route, Routes } from "react-router-dom";
import { CategoriesPages } from "../../categories";
import { Navbar } from "../components/Navbar";
import { AboutCrud, AdminCrud, OrdersManagementPage, ProductsCrud, ProfilePage } from "../pages/";

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
        <Route path= "/Categorias" element = {<CategoriesPages/>}/>

        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};