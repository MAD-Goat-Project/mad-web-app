import Grid from '@mui/material/Grid';
import { Box, Chip, Paper, TextField } from '@mui/material';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Typography from '@mui/material/Typography';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';
import * as React from 'react';
import { Fragment } from 'react';
import {
  IAssessment,
  IAssessmentType,
} from '../../models/assessment.interface';

export function AssessmentContainer({
  assessment,
  validateAnswerHandler,
  answer,
  setAnswer,
}: {
  assessment: IAssessment;
  validateAnswerHandler: () => void;
  answer: string;
  setAnswer: (answer: string) => void;
}) {
  if (
    assessment.type === IAssessmentType.INTRODUCTION ||
    assessment.type === IAssessmentType.CONCLUSION
  ) {
    return null;
  }

  return (
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
  );
}
