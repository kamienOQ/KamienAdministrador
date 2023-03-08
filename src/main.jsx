import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import AboutCrud from './pages/AboutCrud'
import CategoryCrud from './pages/CategoryCrud'
import AdminCrud from './pages/AdminCrud'
import ProductsCrud from './pages/ProductsCrud'
import ProfilePage from './pages/ProfilePage'
import Navbar from "./Components/Navbar"
ReactDOM.createRoot(document.getElementById('root')).render
(
  <React.StrictMode>
    <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Administradores" element={<AdminCrud/>} />
          <Route path= "/Perfil" element = {<ProfilePage/>}/>
          <Route path= "/About" element = {<AboutCrud/>}/>
          <Route path= "/Producto" element = {<ProductsCrud/>}/>
          <Route path= "/Categorias" element = {<CategoryCrud/>}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
)
