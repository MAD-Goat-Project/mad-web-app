import { useProfileList } from '../../hooks/useProfileList';
import { Alert, CircularProgress, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { JSX } from 'react';

function Profile(): JSX.Element {
  const { profileList, isLoading, error } = useProfileList();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert severity="error">
          Unable to load profile, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <Grid item xs={6}>
        <TextField
          style={{ marginTop: '1rem' }}
          disabled
          id="outlined-disabled-username"
          label="Username"
          defaultValue={profileList?.username}
          fullWidth
        />
        <TextField
          style={{ marginTop: '1rem' }}
          disabled
          id="outlined-disabled-email"
          label="Email"
          defaultValue={profileList?.email}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          style={{ marginTop: '1rem' }}
          disabled
          id="outlined-disabled-firstname"
          label="First Name"
          defaultValue={profileList?.firstname}
          fullWidth
        />
        <TextField
          style={{ marginTop: '1rem' }}
          disabled
          id="outlined-disabled-lastname"
          label="Last Name"
          defaultValue={profileList?.lastname}
          fullWidth
        />
      </Grid>
    </div>
  );
}

export default Profile;
