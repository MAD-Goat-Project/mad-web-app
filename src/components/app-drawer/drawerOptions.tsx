import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import HiveIcon from '@mui/icons-material/Hive';
import { IDrawerOptions } from './IDrawerOptions';

export const drawerOptions: IDrawerOptions[] = [
  { Name: 'Home', Icon: HomeIcon, Link: '/' },
  {
    Name: 'Lessons',
    Icon: SchoolIcon,
    hasChildren: true,
    Children: [
      'Introduction',
      'Open Source Software',
      'Microservices',
      'Containers',
      'Infrastructure as Code',
      'API Security',
    ],
  },
  { Name: 'Services', Icon: HiveIcon, Link: '/' },
  { Name: 'Scoreboard', Icon: EmojiEventsIcon, Link: '/' },
  { Name: 'Settings', Icon: SettingsIcon, Link: '/' },
];
