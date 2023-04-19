import { Navigate, Route, Routes } from "react-router-dom";
import { AccountRecoveryPage } from "../pages/AccountRecoveryPage";
import { LoginPage } from "../pages/LoginPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage";
import { SignUpPage } from "../pages/SignUpPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="account-recovery" element={<AccountRecoveryPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="sign-up" element={<SignUpPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
