import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'

interface propTypes {
    title: string;
}

export default function Header(props: propTypes) {
    const { title } = props
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Container maxWidth="sm" >
                        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
                            {title}
                        </Typography>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
