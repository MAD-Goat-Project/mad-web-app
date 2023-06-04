import { Box, Tab, Tabs } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { IAssessment } from '../../models/assessment.interface';
import { transformAssessmentType } from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
import { AssessmentContainer } from '../assessment-container/AssessmentContainer';
import Button from '@mui/material/Button';
import keycloak from '../../configurations/keycloak';
import UserAssessmentAPI from '../../api/lessons-api/assessment-lesson-progress.api';

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

  function markAssessment() {
    console.log('Marking assessment');
    console.log(assessments);
    const assessmentId: number = assessments[value].id;
    const token: string = keycloak.idTokenParsed?.sub ?? '';
    return UserAssessmentAPI.post(token, assessmentId, 2);
  }

  const getTabIndicatorColor = (index: number): string => {
    const assessment = assessments[index];
    const status = assessment.status;
    console.log(status);
    switch (status) {
      case 0:
        return 'black';
      case 1:
        return 'blue';
      case 2:
        return 'green';
      default:
        return 'blue';
    }
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
              sx={{
                color: getTabIndicatorColor(index), // Compute the text color based on the current tab index
              }}
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

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
        {assessments[value].status === 2 ? (
          <Button variant="contained" color="success" disabled>
            Completed
          </Button>
        ) : (
          <Button variant="contained" color="success" onClick={markAssessment}>
            Complete
          </Button>
        )}
      </Box>
    </Box>
  );
}
