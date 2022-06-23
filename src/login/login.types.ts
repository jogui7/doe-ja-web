import { BaseUser } from '../types/user.types'

export type LoginFormData = {
  email: string
  senha: string
}

export type LoginResponseData = {
  token: string
  tipo: string
  usuario: BaseUser
}
