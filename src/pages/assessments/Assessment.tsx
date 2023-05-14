import { Alert, CircularProgress } from '@mui/material';
import * as React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import AssessmentsAPI from '../../api/assessments.api';
import { TabsComponent } from '../../components/tabs/Tabs';
import { IAssessment } from '../../models/assessment.interface';

function AssessmentPage() {
  const { lessonId = '' } = useParams<{ lessonId: string }>();

  const {
    data: assessments,
    isLoading,
    error,
    refetch,
  } = useQuery<IAssessment[]>('assessments', async () => {
    const id: number = parseInt(lessonId) || 0;
    return AssessmentsAPI.get(id);
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
