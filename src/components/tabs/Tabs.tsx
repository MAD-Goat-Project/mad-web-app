import { Alert, Box, Chip, Paper, Snackbar, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IAssessment } from '../../models/assessment.interface';
import { transformAssessmentType } from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import { validateAnswer } from '../../utils/answers.utils';
import { AssessmentContainer } from '../assessment-container/AssessmentContainer';

interface ISnackbarProps {
  open: boolean;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}
function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`,
  };
}
export function TabsComponent({ assessments }: { assessments: IAssessment[] }) {
  const [value, setValue] = useState(0);
  const [assessmentId, setAssessment] = useState(0);
  const [answer, setAnswer] = useState('');
  const [snackbarProps, setShowSnackbar] = useState<ISnackbarProps>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    message: '',
    severity: 'error',
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAssessment(assessments[newValue].id);
  };

  function validateAnswerHandler() {
    // TODO: Use React Query
    validateAnswer(assessmentId, answer).then((response) => {
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
    <Box sx={{ position: 'sticky', zIndex: 1 }}>
      <Snackbar
        cy-data="snackbar"
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Assessments tabs"
          variant="fullWidth"
        >
          {assessments?.map((assessment, index) => (
            <Tab
              label={transformAssessmentType(assessment.type)}
              {...a11yProps(index)}
              key={assessment.id}
            />
          ))}
        </Tabs>
      </Box>
      {
        // TODO: Fix Width and Height
        assessments?.map((assessment, index) => (
          <TabPanel value={value} index={index} key={assessment.id}>
            <Box sx={{ p: 3, minWidth: '80%', minHeight: '80%' }}>
              <Grid container spacing={2}>
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
                    <Typography variant="body1" textAlign="left">
                      {assessment.description}
                    </Typography>
                  </Paper>
                </Grid>
                <AssessmentContainer
                  assessment={assessment}
                  validateAnswerHandler={validateAnswerHandler}
                  answer={answer}
                  setAnswer={setAnswer}
                />
              </Grid>
            </Box>
          </TabPanel>
        ))
      }
    </Box>
  );
}
