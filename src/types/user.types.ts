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

export type UserPreTriage = {
  id: number
  usuarioId: number
  tatuagem: boolean
  droga: boolean
  dst: boolean
  ist: boolean
  cancer: boolean
  transplante: boolean
}

export type EditUserPreTriage = {
  tatuagem: boolean
  droga: boolean
  dst: boolean
  cancer: boolean
  transplante: boolean
}
