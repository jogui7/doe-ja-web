import { isValid } from 'cpf'

export const onlyNumbers = (value: string | null | undefined) => {
  if (value === undefined || value === null) return ''
  return value.replace(/\D/g, '')
}

export const yupValidateCPF = (value: string | null | undefined) => {
  if (!value) return true
  return isValid(onlyNumbers(value))
}
