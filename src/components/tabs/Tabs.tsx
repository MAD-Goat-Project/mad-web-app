import { Box, Paper, Tab, Tabs, TextField } from '@mui/material';
import * as React from 'react';
import { Fragment, useState } from 'react';
import {
  IAssessment,
  IAssessmentType,
} from '../../models/assessment.interface';
import { transformAssessmentType } from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ConstructionIcon from '@mui/icons-material/Construction';
import Button from '@mui/material/Button';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`,
  };
}
export function TabsComponent({ assessments }: { assessments: IAssessment[] }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'sticky', top: 0, zIndex: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Assessments tabs"
          centered
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
      {assessments?.map((assessment, index) => (
        <TabPanel value={value} index={index} key={assessment.id}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid container xs={12} alignContent="flex-start">
                <Typography variant="h6" sx={{ mr: 2 }}>
                  Description
                </Typography>
                <DescriptionIcon />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '20px' }}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                >
                  <Typography variant="body1" textAlign="left">
                    {assessment.description}
                  </Typography>
                </Paper>
              </Grid>
              {assessment.type !== IAssessmentType.INTRODUCTION &&
                assessment.type !== IAssessmentType.CONCLUSION && (
                  <Fragment>
                    <Grid container xs={12} alignContent="flex-start">
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        Goal
                      </Typography>
                      <CrisisAlertIcon />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                      <Paper
                        sx={{ p: 2, display: 'flex', alignItems: 'center' }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" textAlign="left">
                            {assessment.goal}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid container xs={12} alignContent="flex-start">
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        Try it out
                      </Typography>
                      <ConstructionIcon />
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
                          />
                          <Button variant="contained">Submit</Button>
                        </Box>
                      </Paper>
                    </Grid>
                  </Fragment>
                )}
            </Grid>
          </Box>
        </TabPanel>
      ))}
    </Box>
  );
}
