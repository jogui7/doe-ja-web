export type BloodBank = {
  id: number
  nome: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  sangueAMais: string
  sangueAMenos: string
  sangueBMais: string
  sangueBMenos: string
  sangueABMais: string
  sangueABMenos: string
  sangueOMais: string
  sangueOMenos: string
}

export type BloodType =
  | 'sangueAMais'
  | 'sangueAMenos'
  | 'sangueBMais'
  | 'sangueBMenos'
  | 'sangueABMais'
  | 'sangueABMenos'
  | 'sangueOMais'
  | 'sangueOMenos'

// eslint-disable-next-line no-shadow
export enum BloodTypeEnum {
  sangueAMais = 'A+',
  sangueAMenos = 'A-',
  sangueBMais = 'B+',
  sangueBMenos = 'B-',
  sangueABMais = 'AB+',
  sangueABMenos = 'AB-',
  sangueOMais = 'O+',
  sangueOMenos = 'O-',
}

export const bloodTypeOptions: Array<{
  value: string | number | string[]
  label: string
}> = [
  {
    label: BloodTypeEnum.sangueAMais,
    value: 'sangueAMais',
  },
  {
    label: BloodTypeEnum.sangueAMenos,
    value: 'sangueAMenos',
  },
  {
    label: BloodTypeEnum.sangueBMais,
    value: 'sangueBMais',
  },
  {
    label: BloodTypeEnum.sangueBMenos,
    value: 'sangueBMenos',
  },
  {
    label: BloodTypeEnum.sangueABMais,
    value: 'sangueABMais',
  },
  {
    label: BloodTypeEnum.sangueABMenos,
    value: 'sangueABMenos',
  },
  {
    label: BloodTypeEnum.sangueOMais,
    value: 'sangueOMais',
  },
  {
    label: BloodTypeEnum.sangueOMenos,
    value: 'sangueOMenos',
  },
]
