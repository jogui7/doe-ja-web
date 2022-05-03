import React from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Theme,
} from '@mui/material'
import { css } from '@emotion/css'
import useDoeJaStyles from '../doeJaClasses'
import useClasses from '../hooks/useClasses'

function styles(theme: Theme) {
  return {
    paper: css({
      padding: theme.spacing(2),
    }),
  }
}

function Login() {
  const doeJaClasses = useDoeJaStyles()
  const classes = useClasses(styles)

  return (
    <Box className={doeJaClasses.blankPageContainer}>
      <Container maxWidth="md">
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img
                src="https://prefonline-savein.cdn.jelastic.net/wp-content/uploads/sites/20/2018/05/Ilustrativa.jpg"
                alt="logo"
                height={300}
              />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={0} className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField label="email" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <TextField label="senha" variant="outlined" fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained">Entrar</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
