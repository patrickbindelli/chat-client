import React from "react";
import {IconButton, AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import {Menu} from '@mui/icons-material';

const Navbar = () => {
    return(
        <Box sx={{ flexGrow: 1 }}>    
            <AppBar position="static" elevation={0}>
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Chat
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navbar;