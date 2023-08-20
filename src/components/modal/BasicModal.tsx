import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, Tooltip } from '@mui/material';
import usersAPI from '../../api/scoreboard-api/users.api';
import InfoIcon from '@mui/icons-material/Info';
import keycloak from '../../configurations/keycloak';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  gamerTag,
  setGamerTag,
  buttonText,
  openModal,
  setModalOpen,
  refetchUser,
  refetchUsersList,
}: {
  gamerTag: string;
  setGamerTag: React.Dispatch<React.SetStateAction<string>>;
  buttonText: string;
  openModal: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchUser: () => void;
  refetchUsersList: () => void;
}) {
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  function generateRandomName() {
    usersAPI.getRandomName().then((response) => {
      setGamerTag(response.data.name.substring(0, 100));
    });
  }

  function createNewUser() {
    if (gamerTag.length === 0) {
      alert('The gamer tag must have at least 1 character.');
      return;
    }
    keycloak.loadUserProfile().then((userInfo) => {
      if (userInfo.id) {
        usersAPI
          .createNewUser(userInfo.id, gamerTag)
          .then((response) => {
            if (response.status === 201) {
              setModalOpen(false);
              setGamerTag(gamerTag);
              refetchUser();
              refetchUsersList();
            }
          })
          .catch(() => {
            // TODO: Add error handling component
            alert('Something went wrong, please try again later.');
          });
      }
    });
  }

  function closeModal() {
    setModalOpen(false);
  }

  function handleGameTagChange(event: React.ChangeEvent<HTMLInputElement>) {
    setGamerTag(event.target.value.substring(0, 100));
  }

  return (
    <div>
      <Button onClick={handleOpen}>{buttonText}</Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ marginLeft: '10px' }}
            >
              Gamer Tag
            </Typography>
            <Tooltip
              title={
                'To participate in the scoreboard, you need to choose a gamer tag.\n'
              }
            >
              <InfoIcon
                sx={{ fontSize: 20, marginLeft: '10px', cursor: 'pointer' }}
              />
            </Tooltip>
          </div>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Choose your gamer tag"
                variant="outlined"
                value={gamerTag}
                onChange={handleGameTagChange}
              />
            </FormControl>
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={generateRandomName}
          >
            Random gamer tag
          </Button>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{ mt: 2, mr: 2 }}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button variant="contained" sx={{ mt: 2 }} onClick={createNewUser}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
