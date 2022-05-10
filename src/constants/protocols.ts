import { Protocols } from './enums'

export const protocolToIcon = (protocol: Protocols) => {
  if (protocol === Protocols.Lyra) return require('../imgs/icons/lyra.png')
  if (protocol === Protocols.Premia) return require('../imgs/icons/premia.png')
  if (protocol === Protocols.Opyn) return require('../imgs/icons/opyn.png')
  else return undefined
}

export const protocolToLink = (protocol: Protocols) => {
  if (protocol === Protocols.Lyra) return 'https://lyra.finance/'
  if (protocol === Protocols.Premia) return 'https://premia.finance/'
  if (protocol === Protocols.Opyn) return 'https://www.opyn.co/'
  else return '/'
}
