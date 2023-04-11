import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';

import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { drawerOptions } from './drawerOptions';
import PropTypes from 'prop-types';
import { ListDrawer } from './DrawerChildrenItens';

const drawerWidth = 240;

export function AppDrawer({
  openDrawer,
  setOpenState,
}: {
  openDrawer: boolean;
  setOpenState: (open: boolean) => void;
}) {
  const theme = useTheme();

  const DrawerHeader = styled('div')(({ theme: drawerTheme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: drawerTheme.spacing(0, 1),
    // necessary for content to be below app bar
    ...drawerTheme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('app-drawer');
      if (drawer && !drawer.contains(event.target as Node)) {
        setOpenState(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenState]);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpenState(false);
  };

  // TODO : Move the content when the drawer is open
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        position: 'relative',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={openDrawer}
      id="app-drawer"
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {drawerOptions.map((option, index) => (
          <div key={index}>
            <ListItemButton
              key={option.Name}
              onClick={option.Children ? handleClick : undefined}
            >
              <ListItemIcon>
                <option.Icon />
              </ListItemIcon>
              <ListItemText primary={option.Name} />
              {option.hasChildren ? (
                open ? (
                  <ExpandLess />
                ) : (
                  <ExpandMore />
                )
              ) : null}
            </ListItemButton>
            {option.hasChildren ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <ListDrawer />
              </Collapse>
            ) : null}
          </div>
        ))}
      </List>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  openDrawer: PropTypes.bool.isRequired,
  setOpenState: PropTypes.func.isRequired,
};
