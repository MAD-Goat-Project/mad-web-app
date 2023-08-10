import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import UserLessonProgressApi from '../../api/lessons-api/user-lesson-progress.api';
import keycloak from '../../configurations/keycloak';
import { LessonStatus } from '../../models/user-lesson-progress.interface';

const VITE_OBJECT_STORAGE_BASE_URL = import.meta.env
  .VITE_OBJECT_STORAGE_BASE_URL;
export default function LessonCard({
  title,
  description,
  lessonId,
  category,
  progress,
  image,
  image_alt,
}: {
  title: string;
  description: string;
  lessonId: number;
  category: string;
  progress: number;
  image: string;
  image_alt: string;
}) {
  //TODO: On api requests we must treat the then and catch
  function markLesson() {
    UserLessonProgressApi.post(
      keycloak.idTokenParsed?.sub ?? '',
      lessonId,
      LessonStatus.IN_PROGRESS
    );
  }

  function getStatusLabel(): {
    label: string;
    color: 'default' | 'info' | 'success';
  } {
    switch (progress) {
      case 0:
        return { label: 'Not Started', color: 'default' };
      case 1:
        return { label: 'In Progress', color: 'info' };
      case 2:
        return { label: 'Completed', color: 'success' };
      default:
        return { label: 'Not Started', color: 'default' };
    }
  }

  const { label, color } = getStatusLabel();

  return (
    <Card sx={{ maxWidth: '1200px' }} key={lessonId}>
      <CardContent>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <CardMedia
            sx={{ height: 50, width: 50 }}
            // TODO: Dynamically load the image
            image={`${VITE_OBJECT_STORAGE_BASE_URL}/${image}`}
            title="green iguana"
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ marginLeft: '1rem', marginBottom: '0.5rem' }}
          >
            {title}
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ marginTop: '1rem', textAlign: 'left' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/lessons/${category}/${lessonId}`}>
          <Button size="small" onClick={markLesson}>
            {progress === 2 ? 'Review the lesson' : 'Start the lesson'}
          </Button>{' '}
        </Link>
        <div style={{ marginLeft: 'auto' }}>
          <Chip label={label} color={color} />
        </div>
      </CardActions>
    </Card>
  );
}
