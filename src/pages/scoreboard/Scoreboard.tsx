import * as React from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import UsersApi from '../../api/scoreboard-api/users.api';
import keycloak from '../../configurations/keycloak';
import { Alert, CircularProgress } from '@mui/material';
import BasicModal from '../../components/modal/BasicModal';
import { AxiosError } from 'axios';

function ScoreboardPage() {
  const [gamerTag, setGamerTag] = React.useState('');

  const {
    data: userExists,
    isLoading,
    error,
    refetch,
  } = useQuery<boolean>('scoreboard', async () =>
    UsersApi.getClient(keycloak.idTokenParsed?.sub ?? '')
      .then((res) => !!res.data._id)
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          return false;
        } else {
          throw err;
        }
      })
  );

  useEffect(() => {
    refetch();
  }, [refetch, gamerTag]);

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
          Unable to load scoreboards, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      {userExists ? (
        <div>
          <h1>Scoreboard</h1>
          <h2>Welcome {gamerTag}!</h2>
        </div>
      ) : (
        <>
          <Alert severity="warning">
            You need to create a gamer tag to access the scoreboard!
          </Alert>
          <BasicModal
            gamerTag={gamerTag}
            setGamerTag={setGamerTag}
            buttonText={'Create Gamer Tag'}
            openModal={true}
          />
        </>
      )}
    </div>
  );
}

export default function Scoreboard() {
  return <ScoreboardPage />;
}
