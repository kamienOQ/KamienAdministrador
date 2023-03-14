import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { adminTheme } from "./";
import { theme } from './' 

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />

      { children }
    </ThemeProvider>
  )
}

/*export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={adminTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};*/
