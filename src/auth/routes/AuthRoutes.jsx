import { Navigate, Route, Routes } from "react-router-dom";
import { AccountRecovery } from "../pages/AccountRecovery";
import { LoginPage } from "../pages/LoginPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="account-recovery" element={<AccountRecovery />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
