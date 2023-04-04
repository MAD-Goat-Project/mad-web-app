import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';

export const drawerOptions = [
  { Name: 'Home', Icon: HomeIcon },
  {
    Name: 'Lessons',
    Icon: SchoolIcon,
    Children: [
      'Introduction',
      'Open Source Software',
      'Microservices',
      'Containers',
      'Infrastructure as Code',
      'API Security',
    ],
  },
  { Name: 'Scoreboard', Icon: EmojiEventsIcon },
  { Name: 'Settings', Icon: SettingsIcon },
];
