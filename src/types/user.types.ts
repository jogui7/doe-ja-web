import { BloodType } from './bloodbank.types'

export type BaseUser = {
  id: number
  nome: string
  cpf: string
  email: string
  tipoSanguineo: BloodType
  linkImagem: string
}

export type EditUser = {
  nome: string
  tipoSanguineo: BloodType
  linkImagem: string
}
