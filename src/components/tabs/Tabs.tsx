import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IAssessment } from '../../models/assessment.interface';
import { transformAssessmentType } from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
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
                <AssessmentContainer assessment={assessment} />
              </Grid>
            </Box>
          </TabPanel>
        ))
      }
    </Box>
  );
}
