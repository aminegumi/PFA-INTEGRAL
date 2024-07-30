import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const theme = createTheme({
  palette: {
    primary: {
      main: '#BC9F8B',
    },
    secondary: {
      main: '#B5CFB7',
    },
    background: {
      default: '#E7E8D8',
    },
    text: {
      primary: '#000000',
    },
  },
});

const menuItems = [
  {
    name: "Employees",
    items: [
      { key: "list", label: "Employee List" },
      { key: "attendance", label: "Attendance" },
      { key: "leave", label: "Leave Management" }
    ]
  },
  {
    name: "Base Data",
    items: [
      { key: "departments", label: "Departments" },
      { key: "job-categories", label: "Job Categories" },
      { key: "positions", label: "Positions" }
    ]
  },
  {
    name: "Recruitment",
    items: [
      { key: "openings", label: "Job Openings" },
      { key: "applications", label: "Applications" },
      { key: "interviews", label: "Interviews" }
    ]
  },
  {
    name: "Add",
    items: [
      { key: "new-employee", label: "New Employee" },
      { key: "new-department", label: "New Department" },
      { key: "new-job-category", label: "New Job Category" },
      { key: "new-position", label: "New Position" }
    ]
  }
];

export default function AppNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentMenu, setCurrentMenu] = useState<string | null>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, menuName: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentMenu(menuName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMenu(null);
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          sx={{
            background: 'linear-gradient(45deg, #BC9F8B 30%, #CADABF 90%)',
            boxShadow: '0 3px 5px 2px rgba(188, 159, 139, .3)',
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: 'black' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#E7E8D8' }}>
              HR Management
            </Typography>
            {menuItems.map((menu) => (
              <React.Fragment key={menu.name}>
                <Button
                  onClick={(e) => handleClick(e, menu.name)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ 
                    color: 'black',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  {menu.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && currentMenu === menu.name}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      backgroundColor: '#E7E8D8',
                    },
                  }}
                >
                  {menu.items.map((item) => (
                    <MenuItem 
                      key={item.key} 
                      onClick={handleClose}
                      sx={{
                        color: '#000',
                        '&:hover': {
                          backgroundColor: 'rgba(188, 159, 139, 0.1)',
                        },
                      }}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </React.Fragment>
            ))}
            <IconButton
              onClick={handleUserMenuClick}
              size="large"
              edge="end"
              aria-label="user menu"
              sx={{ color: 'black' }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: '#E7E8D8',
                },
              }}
            >
              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{
                  color: '#000',
                  '&:hover': {
                    backgroundColor: 'rgba(188, 159, 139, 0.1)',
                  },
                }}
              >
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{
                  color: '#000',
                  '&:hover': {
                    backgroundColor: 'rgba(188, 159, 139, 0.1)',
                  },
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}