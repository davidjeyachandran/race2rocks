import { createTheme } from "@mui/material";
import { green } from '@mui/material/colors';

const theme = createTheme({
    typography: {
        fontSize: 15
    },
    palette: {

        secondary: {
            main: green[500],
        }
    }
})

export default theme