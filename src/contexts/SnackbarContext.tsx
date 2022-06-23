import { AlertProps } from '@mui/material'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type SnackbarContextState = {
  open: boolean
  message: string
  type: AlertProps['severity']
}

type SnackbarContextProps = {
  handleMessage: ({ message, type }: Omit<SnackbarContextState, 'open'>) => void
  closeSnackbar: () => void
} & SnackbarContextState

const SnackbarContext = createContext<SnackbarContextProps>({
  open: false,
  message: '',
  type: 'success',
  handleMessage: ({ message, type }: Omit<SnackbarContextState, 'open'>) => ({
    message,
    type,
  }),
  closeSnackbar: () => ({}),
})

type SnackbarContextProviderProps = {
  children: React.ReactNode
}

export function SnackbarContextProvider({
  children,
}: SnackbarContextProviderProps) {
  const [state, setState] = useState<SnackbarContextState>({
    open: false,
    message: '',
    type: 'success',
  })

  const handleMessage = useCallback(
    ({ message, type }: Omit<SnackbarContextState, 'open'>) => {
      setState({ message, type, open: true })
    },
    []
  )

  const closeSnackbar = useCallback(
    () =>
      setState((prevState) => ({
        ...prevState,
        open: false,
      })),
    []
  )

  const value = useMemo(
    () => ({
      ...state,
      handleMessage,
      closeSnackbar,
    }),
    [handleMessage, closeSnackbar, state]
  )

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () =>
  useContext<SnackbarContextProps>(SnackbarContext)
