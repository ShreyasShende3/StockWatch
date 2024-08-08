// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = ({ signOut }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: 'none', borderRadius: 0 }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', color: '#fff', paddingRight : '1050px' }}>
          StockWatch
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button component={Link} to="/" sx={buttonStyle}>
            Home
          </Button>
          <Button component={Link} to="/stocks" sx={buttonStyle}>
            Stocks
          </Button>
          <Button component={Link} to="/preferences" sx={buttonStyle}>
            Preferences
          </Button>
        </Box>
        <Button onClick={signOut} sx={{ ...buttonStyle, marginLeft: 'auto' }}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const buttonStyle = {
  color: '#fff',
  '&:hover': {
    backgroundColor: '#444',
  },
  textTransform: 'none',
  fontSize: '16px',
};

export default Navbar;
