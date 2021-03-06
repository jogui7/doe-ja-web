import { Box, Button, Container, Grid, Paper, Theme } from '@mui/material'
import { css } from '@emotion/css'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from 'react-final-form'
import * as yup from 'yup'
import useDoeJaStyles from '../doeJaClasses'
import useClasses from '../hooks/useClasses'
import { inputConfig } from '../components/react-final-forms/inputConfigs'
import yupValidation from '../lib/yupValdiation'
import RFFTextField from '../components/react-final-forms/RFFTextField'
import RFFMaskedField from '../components/react-final-forms/RFFMaskedField'
import { cpfRegex } from '../utils/regexes'
import { yupValidateCPF } from '../utils/validators'
import RFFPassword from '../components/react-final-forms/RFFPassword'
import { SignUpFormData } from './signUp.types'
import api from '../services/api'
import { useSnackbar } from '../contexts/SnackbarContext'

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('insira um email válido')
    .required('obrigatório'),
  nome: yup.string().trim().required('obrigatório'),
  cpf: yup
    .string()
    .trim()
    .required('obrigatório')
    .test('test-cpf', 'cpf inválido', yupValidateCPF),
  senha: yup
    .string()
    .trim()
    .required('obrigatório')
    .min(8, 'mínimo de oito characteres'),
  confirmaSenha: yup
    .string()
    .trim()
    .required('obrigatório')
    .oneOf([yup.ref('senha')], 'senhas precisam ser iguais'),
})

const validate = async (values: SignUpFormData) =>
  yupValidation(validationSchema)({ ...values })

const styles = (theme: Theme) => {
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

function SignUp() {
  const doeJaClasses = useDoeJaStyles()
  const classes = useClasses(styles)
  const { handleMessage } = useSnackbar()
  const navigate = useNavigate()

  const onSubmit = async (values: SignUpFormData) => {
    const response = await api.post<unknown, { message: string }>(
      '/cadastro',
      values
    )

    if (!response.ok) {
      handleMessage({ type: 'error', message: response.data?.message || '' })
    }

    handleMessage({ type: 'success', message: 'Cadastro realizado!' })
    navigate('/login')
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
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <RFFTextField
                          name="nome"
                          label="nome completo"
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RFFTextField
                          label="email"
                          name="email"
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RFFMaskedField
                          name="cpf"
                          label="cpf"
                          mask={cpfRegex}
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RFFPassword
                          label="senha"
                          name="senha"
                          {...inputConfig}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <RFFPassword
                          label="confirmar senha"
                          name="confirmaSenha"
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
                            <Link to="/login" className={doeJaClasses.link}>
                              <Button variant="text">Voltar</Button>
                            </Link>
                          </Grid>
                          <Grid item xs="auto">
                            <Button variant="contained" type="submit">
                              Cadastrar
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

export default SignUp
