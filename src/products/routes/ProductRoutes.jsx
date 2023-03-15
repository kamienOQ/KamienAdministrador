import { Navigate, Route, Routes } from "react-router-dom"
import { ProductPage } from "../pages/ProductPage"


export const ProductRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <ProductPage /> } />

        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
