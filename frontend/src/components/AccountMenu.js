import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Settings, Logout, Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentRole, currentUser } = useSelector((state) => state.user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{
              ml: 2,
              border: '2px solid #e0e0e0',
              transition: '0.3s',
              '&:hover': { borderColor: '#1976d2', transform: 'scale(1.08)' },
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#1976d2',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              {String(currentUser.name).charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: styles.styledPaper,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: '#1976d2',
              mx: 'auto',
              mb: 1,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            {String(currentUser.name).charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {currentUser.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.85rem' }}
          >
            {currentRole}
          </Typography>
        </Box>

        <Divider />

        <MenuItem component={Link} to={`/${currentRole}/profile`} sx={styles.menuItem}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        <MenuItem sx={styles.menuItem}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <Divider />

        <MenuItem component={Link} to="/logout" sx={styles.logoutItem}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#d32f2f' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#d32f2f' }}>Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;

const styles = {
  styledPaper: {
    overflow: 'visible',
    borderRadius: 3,
    minWidth: 220,
    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.15))',
    mt: 1.5,
    '& .MuiMenuItem-root': {
      fontSize: '0.95rem',
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 18,
      width: 12,
      height: 12,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
  menuItem: {
    '&:hover': {
      bgcolor: '#f5f5f5',
    },
  },
  logoutItem: {
    '&:hover': {
      bgcolor: '#fdecea',
    },
  },
};
    