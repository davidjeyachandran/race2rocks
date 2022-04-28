import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" component="h1" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        Race to the Rocks
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
