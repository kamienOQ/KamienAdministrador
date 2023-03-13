import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#222222'
        },
        secondary: {
            main: '#ffffff'
        },
        darkGray: {
            main: '#383838'
        },
        golden: {
            main: '#ca995f'
        },
        error: {
            main: red[700]
        },
    }
})