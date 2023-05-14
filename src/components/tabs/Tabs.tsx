import { Box, Chip, Paper, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IAssessment } from '../../models/assessment.interface';
import { transformAssessmentType } from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import { AssessmentContainer } from '../assessment-container/AssessmentContainer';

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
    <Box sx={{ position: 'sticky', zIndex: 1 }}>
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
                <AssessmentContainer assessment={assessment} />
              </Grid>
            </Box>
          </TabPanel>
        ))
      }
    </Box>
  );
}
