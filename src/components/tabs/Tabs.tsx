import { Box, Tab, Tabs, useMediaQuery } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  IAssessment,
  IAssessmentType,
} from '../../models/assessment.interface';
import {
  allAssessmentsCompleted,
  transformAssessmentType,
} from '../../utils/assessments.utils';
import { TabPanel } from './TabsPanel';
import Grid from '@mui/material/Grid';
import { AssessmentContainer } from '../assessment-container/AssessmentContainer';
import keycloak from '../../configurations/keycloak';
import UserAssessmentAPI from '../../api/lessons-api/user-assessment-progress.api';
import { useLocation, useNavigate } from 'react-router-dom';
import UserProgressAPI from '../../api/lessons-api/user-lesson-progress.api';
import UserLessonProgressApi from '../../api/lessons-api/user-lesson-progress.api';
import Button from '@mui/material/Button';
import { LessonStatus } from '../../models/user-lesson-progress.interface';
import { useTheme } from '@mui/material/styles';

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`,
  };
}

export function TabsComponent({
  assessments,
  refetch,
}: {
  assessments: IAssessment[];
  refetch: () => void;
}) {
  const [value, setValue] = useState(0);
  const [minHeight, setMinHeight] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  async function markAssessment() {
    const assessmentId: number = assessments[value].id;
    await UserAssessmentAPI.post(assessmentId, 2);
    refetch();
    if (assessments[value].type !== IAssessmentType.CONCLUSION)
      setValue(value + 1);
  }

  async function markLesson() {
    const lessonId: number = assessments[value].lesson_id.id;
    const token: string = keycloak.idTokenParsed?.sub ?? '';
    const assessmentProgressId = await UserProgressAPI.get(
      token,
      lessonId
    ).then((response) => {
      return response.data.id;
    });

    return UserLessonProgressApi.patch(
      assessmentProgressId,
      token,
      lessonId,
      LessonStatus.COMPLETED
    );
  }

  function validateAssessment() {
    if (assessments[value].type !== IAssessmentType.CONCLUSION)
      return markAssessment();

    if (allAssessmentsCompleted(assessments)) {
      const promiseAssessment = markAssessment();
      const promiseLesson = markLesson();
      Promise.all([promiseAssessment, promiseLesson]).then(() => {
        const extractedPath = location.pathname
          .split('/')
          .slice(0, 3)
          .join('/');
        navigate(extractedPath);
      });
    } else {
      alert('not all assessments completed');
    }
  }

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const fixedElementsHeight = 56; // Adjust this value if you have any fixed elements above the TabsComponent
    const newMinHeight = windowHeight - fixedElementsHeight;
    setMinHeight(newMinHeight);
  }, [assessments]);
  const getTabIndicatorColor = (index: number): string => {
    const assessment = assessments[index];
    const status = assessment.status;
    switch (status) {
      case 0:
        return 'primary';
      case 1:
        return 'primary';
      case 2:
        return 'green';
      default:
        return 'primary';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        minHeight: minHeight,
      }}
    >
      <Box sx={{ borderColor: 'divider', minWidth: 200 }}>
        <Tabs
          orientation={isSmallScreen ? 'horizontal' : 'vertical'}
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Assessments tabs"
          sx={{
            borderRight: isSmallScreen ? 0 : 1,
            borderColor: 'divider',
            width: isSmallScreen ? '100%' : 'auto',
          }}
        >
          {assessments?.map((assessment, index) => (
            <Tab
              label={transformAssessmentType(assessment.type, index)}
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
            <Box
              sx={{
                p: 3,
                width: '100%',
                margin: isSmallScreen ? '20px auto' : '0 auto', // Adjusted margin based on screen size
                minHeight: minHeight,
              }}
            >
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <AssessmentContainer
                    assessment={assessment}
                    markAssessment={validateAssessment}
                  />
                  {(assessment.type === IAssessmentType.INTRODUCTION ||
                    assessment.type === IAssessmentType.CONCLUSION) && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 2,
                      }}
                    >
                      {assessment.status === 2 ? (
                        <Button variant="contained" color="primary" disabled>
                          Completed
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={validateAssessment}
                        >
                          Complete
                        </Button>
                      )}
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        ))
      }
    </Box>
  );
}
