import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

interface propTypes {
    title: string;
}

export default function Header(props: propTypes) {
    const { title } = props
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Toolbar>
                    <Container maxWidth="md" disableGutters sx={{ px: 2 }}>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, textAlign: 'center' }}>
                            {title}
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
