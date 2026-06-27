import { createTheme } from "@mui/material";

// Rugged, outdoorsy identity: slate granite + sunset coral, warm off-white paper.
const theme = createTheme({
    typography: {
        fontSize: 15,
        fontFamily: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(','),
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h5: { fontWeight: 800, letterSpacing: '-0.01em' },
        h6: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    palette: {
        primary: {
            main: '#2f3e46',
            light: '#52646e',
            dark: '#1b262c',
        },
        secondary: {
            main: '#d8572a',
            light: '#e57b53',
            dark: '#a83f1c',
        },
        background: {
            default: '#f6f4ef',
            paper: '#ffffff',
        },
        text: {
            primary: '#1f2a30',
            secondary: '#5f6f78',
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                outlined: {
                    borderColor: 'rgba(47, 62, 70, 0.12)',
                },
            },
        },
    },
})

export default theme
