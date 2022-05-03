import { useTheme, Theme } from '@mui/material/styles'

const useClasses = (
  createClasses: (theme: Theme) => { [key: string]: string }
) => {
  const theme = useTheme()

  return createClasses(theme)
}

export default useClasses
