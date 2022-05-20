import { css } from '@emotion/css'
import { useTheme } from '@mui/material/styles'

function useDoeJaStyles(): { [key: string]: string } {
  const theme = useTheme()

  return {
    blankPageContainer: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.palette.primary.main,
    }),
    link: css({
      textDecoration: 'none',
    }),
  }
}

export default useDoeJaStyles
