import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Navigate, Outlet } from 'react-router-dom'

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

export default function AppWrap() {
  if (
    !localStorage.getItem('isLogged') ||
    localStorage.getItem('isLogged') === 'false'
  ) {
    return <Navigate to="/login" replace />
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
