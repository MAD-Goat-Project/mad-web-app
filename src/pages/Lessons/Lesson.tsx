import LessonCard from '../../components/card/LessonCard';
import { Grid, Pagination } from '@mui/material';
import { useState } from 'react';

const pageSize = 3;

function CardListWithPagination({ data }: { data: any[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <Grid container spacing={6}>
        {currentData.map((item) => (
          <Grid item xs={12} key={item.id}>
            <LessonCard />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(data.length / pageSize)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
}
function LessonPage() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CardListWithPagination data={[1, 2, 3, 4, 5, 6]} />
    </Grid>
  );
}

export default function Lesson() {
  return <LessonPage />;
}
