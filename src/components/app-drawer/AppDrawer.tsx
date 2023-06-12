import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import Drawer from '@mui/material/Drawer';
import * as React from 'react';
import { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { drawerOptions } from './drawerOptions';
import PropTypes from 'prop-types';
import { ListDrawer } from './DrawerChildrenItens';
import { Link } from 'react-router-dom';
import { DrawerListItemButton } from './DrawerListItemButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const drawerWidth = 240;

// TODO: Refactor this component
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

  /**
   * Handle click outside the drawer
   *
   */
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

  // TODO: Move the content when the app-drawer is open
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
            <MenuOpenIcon color={'primary'} />
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
            {option.hasChildren ? (
              <DrawerListItemButton
                handleClick={handleClick}
                option={option}
                open={open}
              />
            ) : (
              <Link
                key={option.Name}
                to={option.Link || '/'}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <DrawerListItemButton
                  handleClick={handleClick}
                  option={option}
                  open={open}
                />
              </Link>
            )}

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
