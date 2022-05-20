import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#e63e3d',
    },
    secondary: {
      main: '#b63959',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
