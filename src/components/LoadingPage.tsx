import { css } from '@emotion/css'
import { Box, CircularProgress, Grid, Theme, Typography } from '@mui/material'
import useClasses from '../hooks/useClasses'

const styles = (theme: Theme) => ({
  root: css({
    color: theme.palette.common.white,
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  }),
})

function LoadingPage() {
  const classes = useClasses(styles)
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={12}>
        <Grid container justifyContent="center">
          <Grid item xs="auto">
            <Box paddingBottom={4}>
              <CircularProgress size={60} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">carregando ...</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

LoadingPage.defaultProps = {
  title: undefined,
}

export default LoadingPage
