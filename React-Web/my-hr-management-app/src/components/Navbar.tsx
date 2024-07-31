import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Fade } from '@mui/material';

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

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fade in={isVisible}>
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(64, 93, 114, 0.7)',
          color: '#F7E7DC',
          '&:hover': {
            backgroundColor: 'rgba(64, 93, 114, 0.9)',
          },
          zIndex: 1000,
        }}
      >
        <ArrowUpwardIcon />
      </IconButton>
    </Fade>
  );
};


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
    <>
    
        <AppBar 
          position="fixed"
          sx={{
            background: 'linear-gradient(135deg, rgba(255, 248, 243, 0.8) 0%, rgba(117, 134, 148, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 1000,
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: '#36454F' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#36454F' }}>
              HR Management
            </Typography>
            {menuItems.map((menu) => (
              <React.Fragment key={menu.name}>
                <Button
                  onClick={(e) => handleClick(e, menu.name)}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ 
                    color: '#36454F',
                    '&:hover': {
                      backgroundColor: 'rgba(64, 93, 114, 0.1)',
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
                      background: 'linear-gradient(135deg, rgba(255, 248, 243, 0.9) 0%, rgba(117, 134, 148, 0.9) 100%)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                >
                  {menu.items.map((item) => (
                    <MenuItem 
                      key={item.key} 
                      onClick={handleClose}
                      sx={{
                        color: '#405D72',
                        '&:hover': {
                          backgroundColor: 'rgba(64, 93, 114, 0.1)',
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
              sx={{ color: '#405D72' }}
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchorEl}
              open={Boolean(userMenuAnchorEl)}
              onClose={handleUserMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: '#758694',
                },
              }}
            >
              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{
                  color: '#F7E7DC',
                  '&:hover': {
                    backgroundColor: 'rgba(247, 231, 220, 0.1)',
                  },
                }}
              >
                Profile
              </MenuItem>
              <MenuItem 
                onClick={handleUserMenuClose}
                sx={{
                  color: '#F7E7DC',
                  '&:hover': {
                    backgroundColor: 'rgba(247, 231, 220, 0.1)',
                  },
                }}
              >
                Logout
              </MenuItem>
            </Menu>
            </Toolbar>
        </AppBar>
      
      <ScrollToTop />
    </>
  );
}