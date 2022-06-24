import { BloodBank } from './bloodbank.types'

export type ScheduleDonation = {
  usuarioId: number
  bancoSangueId: number
  horarioMarcado: Date
}

export type Donation = {
  id: number
  bancoSangue: BloodBank
  usuarioId: number
  horarioMarcado: Date
}
