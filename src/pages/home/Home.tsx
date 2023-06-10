import * as React from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MadGoatHorizontal from '../../assets/mad-horizontal.svg';
import { madObjectives } from './mad-objectives';
import goat4shellAPI from '../../api/goat4shell-api/goat4shell.api';

function HomePage() {
  const madImageSize = { width: '65%', height: 'auto', marginBottom: '1em' };
  const [alt, setAlt] = React.useState('');

  useEffect(() => {
    const fetchAlt = async () => {
      goat4shellAPI.get().then(
        (response) => {
          setAlt(response.data.description);
        },
        (error) => {
          console.log(error);
          setAlt('Error retrieving alt text');
        }
      );
    };

    // TODO: Is this the best way to do this?
    void fetchAlt();
  }, []);

  return (
    <React.Fragment>
      <Container disableGutters component="main" sx={{ pt: 5, pb: 6 }}>
        <img src={MadGoatHorizontal} style={madImageSize} alt={alt} />
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Embrace the Power of Modern Application Development!
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {madObjectives.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} md={4}>
              <Card>
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: 'center', fontSize: '1.3em' }}
                  action={<tier.icon />}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  ></Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="body1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      ></Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default function Home() {
  return <HomePage />;
}
