export type MenuOption = {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

export type ApiErrorData = {
  message: string
}

export type Address = {
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
}
