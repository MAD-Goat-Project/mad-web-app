import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SettingsIcon from '@mui/icons-material/Settings';
import HiveIcon from '@mui/icons-material/Hive';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

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
  { Name: 'Services', Icon: HiveIcon, Link: '/' },
  { Name: 'Scoreboard', Icon: EmojiEventsIcon, Link: '/' },
  { Name: 'Settings', Icon: SettingsIcon, Link: '/' },
];
