import { Alert, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AssessmentsAPI from '../../api/lessons-api/assessments.api';
import { TabsComponent } from '../../components/tabs/Tabs';
import { IAssessment } from '../../models/assessment.interface';
import keycloak from '../../configurations/keycloak';
import UserAssessmentAPI from '../../api/lessons-api/assessment-lesson-progress.api';

function AssessmentPage() {
  const { lessonId = '' } = useParams<{ lessonId: string }>();

  // TODO: This join can be done on the API Level with only one request
  // TODO: Also if udefined default to 0
  const {
    data: assessments,
    isLoading,
    error,
    refetch,
  } = useQuery<IAssessment[]>('assessments', async () => {
    const id: number = parseInt(lessonId) || 0;
    const assessmentArray = await AssessmentsAPI.get(id);
    const assessmentPromises = assessmentArray.map(async (assessment) => {
      const response = await UserAssessmentAPI.get(
        keycloak.idTokenParsed?.sub ?? '',
        assessment.id
      );
      if (response.status === 200) {
        return {
          ...assessment,
          status: response.data.status,
        };
      } else {
        return {
          ...assessment,
          status: 0,
        };
      }
    });
    // TODO: Validate that the same user cannot have the same lesson progress twice
    // TODO: One line
    const asssessmentWithProgress = await Promise.all(assessmentPromises);
    return asssessmentWithProgress;
  });

  useEffect(() => {
    refetch(); // TODO: Refetch the data when the currentPage changes
  }, [lessonId]);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert severity="error">
          Unable to load assessments, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return <TabsComponent assessments={assessments ?? []} />;
}

export default function Assessment() {
  return <AssessmentPage />;
}
