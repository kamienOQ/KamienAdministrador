import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRouter } from "./router/AppRouter";

export const AdminApp = () => {
  const { theme } = useSelector((state) => state.ui);

  const adminTheme = createTheme({
    palette: {
      mode: theme ? 'light' : 'dark',
    },
  });

  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
};
