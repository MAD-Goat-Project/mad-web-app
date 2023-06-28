import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface IDrawerOptions {
  Name: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  Link?: string;
  hasChildren?: boolean;
  Children?: string[];
}

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
  { Name: 'Scoreboard', Icon: EmojiEventsIcon, Link: '/scoreboard' },
  { Name: 'Settings', Icon: SettingsIcon, Link: '/' },
];