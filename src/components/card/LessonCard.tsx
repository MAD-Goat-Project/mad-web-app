import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Chip } from '@mui/material';

export default function LessonCard({
  title,
  description,
  lessonId,
}: {
  title: string;
  description: string;
  lessonId: number;
}) {
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
        <Button size="small">Take the lesson</Button>{' '}
        <Chip label="Not Completed" color="primary" />
      </CardActions>
    </Card>
  );
}
