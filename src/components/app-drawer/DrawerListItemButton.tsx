import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import * as React from 'react';
import { IDrawerOptions } from './drawerOptions';
import PropTypes from 'prop-types';

export function DrawerListItemButton({
  handleClick,
  option,
  open,
}: {
  handleClick: () => void;
  option: IDrawerOptions;
  open: boolean;
}) {
  return (
    <ListItemButton
      key={option.Name}
      onClick={option.Children ? handleClick : undefined}
    >
      <ListItemIcon>
        <option.Icon />
      </ListItemIcon>
      <ListItemText primary={option.Name} />
      {option.hasChildren ? open ? <ExpandLess /> : <ExpandMore /> : null}
    </ListItemButton>
  );
}

DrawerListItemButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
};
