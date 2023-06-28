import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

/**
 * Snackbar Props
 * @interface ISnackbarProps
 * @property {boolean} open
 * @property {string} message
 * @property {'success' | 'info' | 'warning' | 'error'} severity
 * @property {'top' | 'bottom'} [vertical]
 * @property {'left' | 'center' | 'right'} [horizontal]
 * @returns {React.ReactElement}
 */
export interface ISnackbarProps {
  open: boolean;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

/**
 * Snackbar Alert
 * @param {ISnackbarProps} props
 * @returns {React.ReactElement}
 *
 */
export default function SnackBarAlert({
  open,
  onClose,
  message,
  severity,
  vertical = 'bottom',
  horizontal = 'right',
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}) {
  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        open={open}
        onClose={onClose}
        autoHideDuration={4000}
        key={'bottom-right'}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </React.Fragment>
  );
}

SnackBarAlert.defaultProps = {
  vertical: 'bottom',
  horizontal: 'right',
};
