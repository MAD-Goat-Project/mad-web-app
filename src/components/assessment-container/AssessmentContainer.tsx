import Grid from '@mui/material/Grid';
import { Alert, Box, Chip, Paper, Snackbar, TextField } from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import * as React from 'react';
import { Fragment, useState } from 'react';
import {
  IAssessment,
  IAssessmentType,
} from '../../models/assessment.interface';
import { validateAnswer } from '../../utils/answers.utils';
import DescriptionIcon from '@mui/icons-material/Description';

interface ISnackbarProps {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}
export function AssessmentContainer({
  assessment,
}: {
  assessment: IAssessment;
}) {
  const [answer, setAnswer] = useState('');
  const [snackbarProps, setShowSnackbar] = useState<ISnackbarProps>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: '',
    severity: 'error',
  });

  function validateAnswerHandler() {
    // TODO: Use React Query
    validateAnswer(assessment.id, answer).then((response) => {
      if (response) {
        return setShowSnackbar({
          ...snackbarProps,
          open: true,
          message: 'Correct Answer!',
          severity: 'success',
        });
      }
      return setShowSnackbar({
        ...snackbarProps,
        open: true,
        message: 'Incorrect Answer!',
        severity: 'error',
      });
    });
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: snackbarProps.vertical,
          horizontal: snackbarProps.horizontal,
        }}
        open={snackbarProps.open}
        onClose={() => setShowSnackbar({ ...snackbarProps, open: false })}
        autoHideDuration={4000}
        key={'bottom-right'}
      >
        <Alert severity={snackbarProps.severity}>{snackbarProps.message}</Alert>
      </Snackbar>
      <Grid container xs={12} alignContent="flex-start">
        <Chip icon={<DescriptionIcon />} label="Description" />
      </Grid>
      <Grid item xs={12} style={{ marginBottom: '20px' }}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
          }}
        >
          <Typography variant="body1" textAlign="justify" component="div">
            {assessment.description.split('\n').map((line, key) => (
              <React.Fragment key={key}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Typography>
        </Paper>
      </Grid>

      {assessment.type !== IAssessmentType.INTRODUCTION &&
        assessment.type !== IAssessmentType.CONCLUSION && (
          <Fragment>
            <Grid container xs={12} alignContent="flex-start">
              <Chip icon={<CrisisAlertIcon />} label="Goal" />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" textAlign="left">
                    {assessment.goal}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid container xs={12} alignContent="flex-start">
              <Chip icon={<ConstructionIcon />} label="Try it out" />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <Paper sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <TextField
                    label="Submit your answer"
                    sx={{ mb: 2, width: '300px' }}
                    value={answer}
                    onChange={(e) => {
                      setAnswer(e.target.value);
                    }}
                  />
                  <Button variant="contained" onClick={validateAnswerHandler}>
                    Submit
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Fragment>
        )}
    </div>
  );
}
