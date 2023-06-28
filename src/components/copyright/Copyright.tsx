import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';

// TODO: Remove the link to MUI
export function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MAD Goat Project
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
