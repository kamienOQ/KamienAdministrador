import { Navigate, Route, Routes } from "react-router-dom";
import { OrdersManagementPage } from "../pages/OrdersManagementPage";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OrdersManagementPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
