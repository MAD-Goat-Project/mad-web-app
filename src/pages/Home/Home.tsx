import * as React from 'react';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import ButtonAppBar from '../../components/AppBar';
import SchoolIcon from '@mui/icons-material/School';
import { BugReport, Speed } from '@mui/icons-material';

const tiers = [
  {
    icon: SchoolIcon,
    title: 'Educational',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
  },
  {
    icon: BugReport,
    title: 'Vulnerable by nature',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
  },
  {
    icon: Speed,
    title: 'A benchmark tool',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit'],
  },
];

function HomePage() {
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <CssBaseline />
      <ButtonAppBar />
      {/* Hero unit */}
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          marginBottom={'1em'}
        >
          MAD Goat Project
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          facilisis felis non commodo consequat. Suspendisse fermentum orci id
          orci cursus, non finibus augue facilisis.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
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
                        variant="subtitle1"
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
