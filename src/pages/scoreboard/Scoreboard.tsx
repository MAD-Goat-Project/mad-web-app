import * as React from 'react';
import { useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import BasicModal from '../../components/modal/BasicModal';
import EnhancedTable from '../../components/table/EnhancedTable';
import { useScoreboardUsersList } from '../../hooks/useScoreboardUsersList';
import { useScoreboardUser } from '../../hooks/useScoreboardUser';

// TODO: Change API so that it returns a 200 if the user does not exist but specifies that the user does not exist

function ScoreboardPage() {
  const [gamerTag, setGamerTag] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const { userExists, isLoadingUser, errorUser, refetchUser } =
    useScoreboardUser();
  const { userList, loadingUsers, errorUsers, refetchUsers } =
    useScoreboardUsersList();

  if (isLoadingUser) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (errorUser) {
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
            refetchUser={refetchUser}
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
