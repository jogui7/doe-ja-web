import { Address } from '../types/general.types'

const formatAddress = ({ rua, numero, bairro, cidade, uf }: Address): string =>
  `${rua}, ${numero} - ${bairro}, ${cidade} - ${uf}`

export default formatAddress
