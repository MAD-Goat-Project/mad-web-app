import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const DOCS_URL = import.meta.env.VITE_DOCS_BASE_URL as string;
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
  { Name: 'Profile', Icon: PersonIcon, Link: '/profile' },
  { Name: 'Docs', Icon: LibraryBooksIcon, Link: DOCS_URL },
];
