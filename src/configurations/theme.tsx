import { createTheme } from '@mui/material/styles';
import { Theme } from '@emotion/react';
import { green, red } from '@mui/material/colors';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    success: {
      main: green.A400,
    },
  },
});

export default theme;
