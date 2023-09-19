import Grid from '@mui/material/Grid';
import { Box, Chip, Paper } from '@mui/material';
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
import { Submissions } from './Submissions';
import SnackBarAlert, { ISnackbarProps } from '../snackbar/Snackbar';
import ParsedHTML from '../../utils/ParsedHTML';

export function AssessmentContainer({
  assessment,
  markAssessment,
}: {
  assessment: IAssessment;
  markAssessment: () => void;
}) {
  const [answer, setAnswer] = useState<string[]>([]);
  const [snackbarProps, setShowSnackbar] = useState<ISnackbarProps>({
    open: false,
    message: '',
    severity: 'error',
  });

  function validateAnswerHandler() {
    validateAnswer(assessment.id, answer).then((response) => {
      if (response) {
        markAssessment();
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
      <SnackBarAlert
        severity={snackbarProps.severity}
        onClose={() => setShowSnackbar({ ...snackbarProps, open: false })}
        message={snackbarProps.message}
        open={snackbarProps.open}
      />

      <Grid
        item
        container
        xs={12}
        style={{ marginBottom: '10px' }}
        alignContent="flex-start"
      >
        {/*<Chip icon={<DescriptionIcon />} label="Description" />*/}
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
            {ParsedHTML(assessment.description)}
          </Typography>
        </Paper>
      </Grid>

      {assessment.type !== IAssessmentType.INTRODUCTION &&
        assessment.type !== IAssessmentType.CONCLUSION && (
          <Fragment>
            <Grid
              item
              container
              xs={12}
              alignContent="flex-start"
              style={{ marginBottom: '10px' }}
            >
              <Chip icon={<CrisisAlertIcon />} label="Goal" />
            </Grid>
            <Grid item xs={12} style={{ marginBottom: '20px' }}>
              <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" textAlign="left">
                    {ParsedHTML(assessment.goal)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid
              item
              container
              xs={12}
              alignContent="flex-start"
              style={{ marginBottom: '10px' }}
            >
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
                  <Submissions
                    assessment={assessment}
                    answer={answer}
                    setAnswer={setAnswer}
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
