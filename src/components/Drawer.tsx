import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

const madImageSize = { width: '100px', height: '50px' };
const drawerOptions = [
  { Name: 'Home', Icon: HomeIcon },
  {
    Name: 'Lessons',
    Icon: SchoolIcon,
    Children: [
      'Introduction',
      'Open Source Software',
      'Microservices',
      'Cotainers',
      'Infrastucture as Code',
      'API Security',
    ],
  },
  { Name: 'Scoreboard', Icon: EmojiEventsIcon },
  { Name: 'Settings', Icon: SettingsIcon },
];
export function AppDrawer({
  openDrawer,
  setOpenState,
  appBarTheme,
}: {
  openDrawer: boolean;
  setOpenState: (open: boolean) => void;
  appBarTheme: any;
}) {
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleDrawerClose = () => {
    setOpenState(false);
  };

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
          {appBarTheme.direction === 'ltr' ? (
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
