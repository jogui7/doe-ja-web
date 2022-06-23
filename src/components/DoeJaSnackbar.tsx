import {
  Alert,
  IconButton,
  Snackbar as MuiSnackbar,
  Theme,
} from '@mui/material'
import { CloseRounded } from '@mui/icons-material'
import { css } from '@emotion/css'
import { useSnackbar } from '../contexts/SnackbarContext'
import useClasses from '../hooks/useClasses'

const styles = (theme: Theme) => {
  return {
    snackbar: css({
      marginTop: theme.spacing(8),
    }),
  }
}

function DoeJaSnackbar() {
  const classes = useClasses(styles)
  const { closeSnackbar, open, message, type } = useSnackbar()

  return (
    <MuiSnackbar
      onClose={(_, reason) => reason === 'timeout' && closeSnackbar()}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      className={classes.snackbar}
      open={open}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity={type}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={closeSnackbar}
          >
            <CloseRounded fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}

export default DoeJaSnackbar
