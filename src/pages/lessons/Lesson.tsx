import LessonCard from '../../components/card/LessonCard';
import { Alert, CircularProgress, Grid, Pagination } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoriesAPI from '../../api/lessons-api/categories.api';
import LessonsAPI from '../../api/lessons-api/lessons.api';
import { useQuery } from 'react-query';
import keycloak from '../../configurations/keycloak';
import UserProgressAPI from '../../api/lessons-api/user-lesson-progress.api';
import { ILesson } from '../../models/lesson.interface';

const pageSize = 3;

function LessonPage() {
  const { category = '' } = useParams<{ category: string }>();

  const {
    data: lessons,
    isLoading,
    error,
    refetch,
  } = useQuery<ILesson[]>('lessons', async () => {
    const id: number = await CategoriesAPI.getCategoryId(category).then(
      (response) => {
        return response.data[0].id;
      }
    );
    const lessonArray = await LessonsAPI.get(id).then(
      (response) => response.data
    );
    // TODO: Validate that the same user cannot have the same lesson progress twice

    const lessonPromises = lessonArray.map(async (lesson) => {
      const response = await UserProgressAPI.get(
        keycloak.idTokenParsed?.sub ?? '',
        lesson.id
      );
      if (response.status === 200) {
        return {
          ...lesson,
          status: response.data.status,
        };
      } else {
        return {
          ...lesson,
          status: 0,
        };
      }
    });

    const lessonsWithProgress = await Promise.all(lessonPromises);
    return lessonsWithProgress;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    refetch(); // TODO: Refetch the data when the currentPage changes
  }, [category]);

  //const startIndex = (currentPage - 1) * pageSize;
  //const endIndex = startIndex + pageSize;
  //const currentData = data.slice(startIndex, endIndex);

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
          Unable to load lessons, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <Grid container spacing={2} direction="column">
        {lessons?.map((lesson) => (
          <Grid item xs={12} marginBottom={2} key={lesson.id}>
            <LessonCard
              title={lesson.name}
              description={lesson.description}
              lessonId={lesson.id}
              category={category}
              progress={lesson.status ? lesson.status : 0}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(lessons ? lessons.length / pageSize : 0)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
}

export default function Lesson() {
  return <LessonPage />;
}
