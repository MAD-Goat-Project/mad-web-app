import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { IAssessment } from '../../models/assessment.interface';
import AssessmentsAPI from '../../api/lessons-api/assessments.api';
import * as React from 'react';
import { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import BasicModal from '../../components/modal/BasicModal';

function ScoreboardPage() {
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
          Unable to load scoreboards, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h1>Scoreboard</h1>
      <BasicModal></BasicModal>
    </div>
  );
}

export default function Scoreboard() {
  return <ScoreboardPage />;
}
