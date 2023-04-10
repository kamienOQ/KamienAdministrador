import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#D4AF37",
    },
    error: {
      main: red.A400,
    },
  },
});
