import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#ffffff'
        },
        golden: {
            main: '#ca995f'
        },
        error: {
            main: red[700]
        }
    }
})