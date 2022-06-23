import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import type {} from '@mui/x-data-grid/themeAugmentation'

const theme = createTheme({
  palette: {
    text: {
      primary: '#424242',
    },
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
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          border: 'none',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        colorPrimary: { color: '#fff' },
      },
    },
  },
})

export default theme
