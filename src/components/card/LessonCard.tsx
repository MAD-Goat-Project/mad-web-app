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

export default function LessonCard({
  title,
  description,
  lessonId,
  category,
  progress,
}: {
  title: string;
  description: string;
  lessonId: number;
  category: string;
  progress: number;
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
            image="/mad.svg"
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
        <Link to={`/${category}/lessons/${lessonId}`}>
          <Button size="small" onClick={markLesson}>
            Take the lesson
          </Button>{' '}
        </Link>
        <Chip label={label} color={color} />
      </CardActions>
    </Card>
  );
}
