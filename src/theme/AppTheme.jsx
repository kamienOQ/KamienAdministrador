import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { adminTheme } from "./";
import { theme } from './theme';

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
