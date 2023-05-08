import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '../avatar/Avatar';
import Grid from '@mui/material/Grid';
import MADHorizontal from '../../assets/mad-horizontal.svg';
import { AppDrawer } from '../app-drawer/AppDrawer';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: '#ffff',
  marginBottom: '20px',
  width: '100%',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const madImageSize = { width: '100px', height: '50px' };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '10vh' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            {
              <img
                src={MADHorizontal}
                alt="MAD Goat Logo"
                style={madImageSize}
              />
            }
          </IconButton>
          <Grid container justifyContent="flex-end">
            <Avatar />
          </Grid>
        </Toolbar>
      </AppBar>
      <AppDrawer openDrawer={open} setOpenState={setOpen} />
    </Box>
  );
}
