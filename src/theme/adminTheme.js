import { createTheme } from "@mui/material";
import { esES } from '@mui/material/locale';

export const adminTheme = createTheme({
  palette: {
    primary: {
      main: '#0E1116',
    },
    secondary: {
      main: '#c9c9c9',
    },
    dark: {
      main: '#ffffff',
    },
    info: {
      main: '#256EFF'
    },
    error: {
      main: '#BF1A2F'
    },
  },
  locale: esES,
});
