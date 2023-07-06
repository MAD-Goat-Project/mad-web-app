import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import keycloak from '../../configurations/keycloak';

export function Avatar() {
  const isDevelopmentMode = import.meta.env.MODE === 'development';

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="secondary"
      >
        <AccountCircle color={'primary'} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
        {isDevelopmentMode && (
          <>
            <Divider />
            <MenuItem
              onClick={() => {
                console.log(keycloak.token);
                keycloak.loadUserInfo().then((userInfo) => {
                  console.log(userInfo);
                });
                navigator.clipboard
                  .writeText(keycloak.token ? keycloak.token : '')
                  .then(() => console.log('Token copied to clipboard.'));
              }}
            >
              Token
            </MenuItem>
          </>
        )}
      </Menu>
    </div>
  );
}
