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
import { styled, useTheme } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import { drawerOptions } from './DrawerOptions';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Categories from '../../api/categories.api';

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

  const [open, setOpen] = React.useState(true);
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery('categories', Categories.get);

  if (categories) {
    console.log(categories);
  }

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpenState(false);
  };

  // TODO: Clicking outside the drawer should close it
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={openDrawer}
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
              {option.Children ? open ? <ExpandLess /> : <ExpandMore /> : null}
            </ListItemButton>
            {option.Children ? (
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {option.Children.map((child) => (
                    <ListItemButton key={child}>
                      <ListItemText>
                        <Typography
                          variant="body2"
                          gutterBottom
                          align={'left'}
                          sx={{ marginLeft: '3rem' }}
                        >
                          {child}
                        </Typography>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
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
