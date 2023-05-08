import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { adminTheme } from "./";

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};