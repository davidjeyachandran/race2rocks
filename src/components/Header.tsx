import { Container } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth="sm" >
                        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                            Race to the Rocks
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
