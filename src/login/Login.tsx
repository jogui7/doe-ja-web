import React from 'react'
import { Box, Button, Container, Grid, Paper, Theme } from '@mui/material'
import { css } from '@emotion/css'
import { Link } from 'react-router-dom'
import { Form } from 'react-final-form'
import * as yup from 'yup'
import useDoeJaStyles from '../doeJaClasses'
import useClasses from '../hooks/useClasses'
import { inputConfig } from '../components/react-final-forms/inputConfigs'
import yupValidation from '../lib/yupValdiation'
import { LoginFormData } from './login.types'
import RFFTextField from '../components/react-final-forms/RFFTextField'
import RFFPassword from '../components/react-final-forms/RFFPassword'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('insira um email válido')
    .required('obrigatório'),
  password: yup.string().trim().required('obrigatório'),
})

const validate = async (values: LoginFormData) =>
  yupValidation(validationSchema)({ ...values })

function styles(theme: Theme) {
  return {
    paper: css({
      padding: theme.spacing(2),
    }),
    grid: css({
      justifyContent: 'space-between',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    }),
  }
}

function Login() {
  const doeJaClasses = useDoeJaStyles()
  const classes = useClasses(styles)

  const onSubmit = (values: LoginFormData) => {
    return values
  }

  return (
    <Box className={doeJaClasses.blankPageContainer}>
      <Container maxWidth="md">
        <Grid container alignItems="center" className={classes.grid}>
          <Grid item xs="auto">
            <Box display="flex" alignItems="center" justifyContent="center">
              {/* <img
                src="https://prefonline-savein.cdn.jelastic.net/wp-content/uploads/sites/20/2018/05/Ilustrativa.jpg"
                alt="logo"
                height={300}
              /> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Paper elevation={0} className={classes.paper}>
              <Form onSubmit={onSubmit} validate={validate}>
                {({ handleSubmit }) => (
                  <form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <RFFTextField
                          label="email"
                          name="email"
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RFFPassword
                          label="senha"
                          name="password"
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid
                          container
                          spacing={1}
                          justifyContent="space-between"
                        >
                          <Grid item xs="auto">
                            <Link
                              to="/cadastre-se"
                              className={doeJaClasses.link}
                            >
                              <Button variant="text">Criar conta</Button>
                            </Link>
                          </Grid>
                          <Grid item xs="auto">
                            <Button
                              variant="contained"
                              onClick={handleSubmit}
                              type="submit"
                            >
                              Entrar
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Login
