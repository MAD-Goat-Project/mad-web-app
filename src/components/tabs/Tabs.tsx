import { Box, Tab, Tabs } from '@mui/material';
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function markAssessment() {
    const assessmentId: number = assessments[value].id;
    const token: string = keycloak.idTokenParsed?.sub ?? '';
    return UserAssessmentAPI.post(token, assessmentId, 2).then(() => {
      refetch();
    });
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
            <Box sx={{ p: 3, minWidth: '80%', minHeight: minHeight }}>
              <Grid container spacing={2}>
                <AssessmentContainer
                  assessment={assessment}
                  markAssessment={validateAssessment}
                />
              </Grid>
              {(assessments[value].type === IAssessmentType.INTRODUCTION ||
                assessments[value].type === IAssessmentType.CONCLUSION) && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 2,
                  }}
                >
                  {assessments[value].status === 2 ? (
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
            </Box>
          </TabPanel>
        ))
      }
    </Box>
  );
}
