import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Navigate, Outlet } from 'react-router-dom'
import {
  ApplicationContextProvider,
  useApplicationContext,
} from '../../contexts/ApplicationContext'
import LoadingPage from '../LoadingPage'

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  maxWidth: '100vw',
  padding: theme.spacing(3),
  backgroundColor: '#F2F2F2',
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

function Wrap() {
  const { state } = useApplicationContext()

  if (state?.isLoading) {
    return <LoadingPage />
  }

  if (!state?.session || !state?.user) {
    return <Navigate to="/login" replace />
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <MuiAppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Doe Já
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Main>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  )
}

export default function AppWrap() {
  return (
    <ApplicationContextProvider>
      <Wrap />
    </ApplicationContextProvider>
  )
}
