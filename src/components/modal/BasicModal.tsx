import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import usersAPI from '../../api/scoreboard-api/users.api';

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const [gamerTag, setGamerTag] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function generateRandomName() {
    usersAPI.getRandomName().then((response) => {
      setGamerTag(response.data.name);
    });
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AccountCircle sx={{ fontSize: 40 }} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Choose your gamer tag"
                variant="outlined"
                value={gamerTag}
                onChange={(event) => setGamerTag(event.target.value)}
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
            <Button variant="contained" sx={{ mt: 2 }} onClick={closeModal}>
              Save
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
