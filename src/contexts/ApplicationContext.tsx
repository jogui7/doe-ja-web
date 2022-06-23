import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { setToken } from '../services/api'
import { BaseUser } from '../types/user.types'

type ApplicationContextState = {
  session?: string
  user?: BaseUser
  isLoading: boolean
}

type ApplicationContextProps = {
  state?: ApplicationContextState
  handleLogout: () => void
  updateUser: (updatedUser: BaseUser) => void
}

const ApplicationContext = createContext<ApplicationContextProps>({
  handleLogout: () => ({}),
  updateUser: (updatedUser: BaseUser) => updatedUser,
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

    setToken(localSession)
    setSession(localSession)
    setUser(JSON.parse(localUser))

    return setIsLoading(false)
  }, [handleLogout])

  const updateUser = useCallback((updatedUser: BaseUser) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }, [])

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
      updateUser,
    }),
    [session, user, isLoading, handleLogout, updateUser]
  )

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplicationContext = () =>
  useContext<ApplicationContextProps>(ApplicationContext)
