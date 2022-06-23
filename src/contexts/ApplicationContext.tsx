import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { BaseUser } from '../types/user.types'

type ApplicationContextState = {
  session?: string
  user?: BaseUser
  isLoading: boolean
}

type ApplicationContextProps = {
  state?: ApplicationContextState
  handleLogout: () => void
}

const ApplicationContext = createContext<ApplicationContextProps>({
  handleLogout: () => ({}),
})

type ApplicationContextProviderProps = {
  children: React.ReactNode
}

export function ApplicationContextProvider({
  children,
}: ApplicationContextProviderProps) {
  const [session, setSession] = useState<string>()
  const [user, setUser] = useState<BaseUser>()
  const [isLoading, setIsLoading] = useState(true)

  const handleLogout = useCallback(() => {
    setIsLoading(true)
    setUser(undefined)
    setSession(undefined)
    localStorage.clear()
    setIsLoading(false)
  }, [])

  const initContext = useCallback(() => {
    setIsLoading(true)
    const localSession = localStorage.getItem('session')
    const localUser = localStorage.getItem('user')

    if (!localSession || !localUser) {
      return handleLogout()
    }

    setSession(localSession)
    setUser(JSON.parse(localUser))

    return setIsLoading(false)
  }, [handleLogout])

  useEffect(() => {
    initContext()
  }, [initContext])

  const value: ApplicationContextProps = useMemo(
    () => ({
      state: {
        session,
        user,
        isLoading,
      },
      handleLogout,
    }),
    [session, user, isLoading, handleLogout]
  )

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () =>
  useContext<ApplicationContextProps>(ApplicationContext)
