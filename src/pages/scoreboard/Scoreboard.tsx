import * as React from 'react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import UsersApi from '../../api/scoreboard-api/users.api';
import keycloak from '../../configurations/keycloak';
import { Alert, CircularProgress } from '@mui/material';
import BasicModal from '../../components/modal/BasicModal';
import { AxiosError } from 'axios';
import EnhancedTable from '../../components/table/EnhancedTable';
import { useScoreboardUsersList } from '../../hooks/useScoreboardUsersList';
import { useLocation } from 'react-router-dom';

// TODO: Change API so that it returns a 200 if the user does not exist but specifies that the user does not exist

function ScoreboardPage() {
  const [gamerTag, setGamerTag] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {
    data: userExists,
    isLoading,
    error,
    refetch,
  } = useQuery<boolean>('scoreboard', async () =>
    UsersApi.getClient(keycloak.idTokenParsed?.sub ?? '')
      .then((res) => {
        return res.status === 200 && res.data.name?.length > 0;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 404) {
          return false;
        } else {
          throw err;
        }
      })
  );

  const { userList, loadingUsers, errorUsers, refetchUsers } =
    useScoreboardUsersList();
  const location = useLocation();

  useEffect(() => {
    refetchUsers();
  }, [location, refetchUsers]);

  useEffect(() => {
    refetch();
  }, [refetch]);

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
          <EnhancedTable
            userList={userList ?? []}
            isLoading={loadingUsers}
            error={errorUsers}
          />
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
            openModal={isModalOpen}
            setModalOpen={setIsModalOpen}
            refetchUser={refetch}
            refetchUsersList={refetchUsers}
          />
        </>
      )}
    </div>
  );
}

export default function Scoreboard() {
  return <ScoreboardPage />;
}
