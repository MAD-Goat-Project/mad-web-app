import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export interface IDrawerOptions {
  Name: string;
  Icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  Link?: string;
  hasChildren?: boolean;
  Children?: string[];
}
