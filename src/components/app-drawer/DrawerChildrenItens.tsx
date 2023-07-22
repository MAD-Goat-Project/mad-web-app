import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import * as React from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCategoryList } from '../../hooks/useCategoryList';

export function ListDrawer() {
  const { categoryList, isLoading, error } = useCategoryList();

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert severity="error">
          Unable to load lessons, please try again later!{' '}
        </Alert>
      </div>
    );
  }

  return (
    <List component="div" disablePadding>
      {categoryList?.map((child) => (
        <Link
          key={child.id}
          to={`/lessons/${child.name}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemButton key={child.name}>
            <ListItemText>
              <Typography
                variant="body2"
                gutterBottom
                align={'left'}
                sx={{ marginLeft: '3rem' }}
              >
                {child.full_name}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
}
