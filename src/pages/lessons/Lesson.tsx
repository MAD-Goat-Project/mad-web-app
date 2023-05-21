import LessonCard from '../../components/card/LessonCard';
import { Alert, CircularProgress, Grid, Pagination } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoriesAPI from '../../api/lessons-api/categories.api';
import LessonsAPI, { ILesson } from '../../api/lessons-api/lessons.api';
import { useQuery } from 'react-query';

const pageSize = 3;

function LessonPage() {
  const { category = '' } = useParams<{ category: string }>();

  const {
    data: lessons,
    isLoading,
    error,
    refetch,
  } = useQuery<ILesson[]>('lessons', async () => {
    const id: number = await CategoriesAPI.getCategoryId(category);

    return LessonsAPI.get(id);
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
