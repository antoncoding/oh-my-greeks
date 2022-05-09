import { SupportedNetworks } from './networks'

type graphEndPointType = {
  [key in SupportedNetworks]: string
}

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

export const networkToProvider: { [key in SupportedNetworks]: string } = {
  [SupportedNetworks.Mainnet]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedNetworks.Kovan]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedNetworks.Ropsten]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [SupportedNetworks.Avalanche]: 'https://api.avax.network/ext/bc/C/rpc',
  [SupportedNetworks.Arbitrum]: 'https://arb1.arbitrum.io/rpc',
  [SupportedNetworks.Matic]: 'https://rpc-mainnet.maticvigil.com/',
  [SupportedNetworks.Optimism]: 'https://mainnet.optimism.io',
}

export const networkIdToName: { [key in SupportedNetworks]: string } = {
  [SupportedNetworks.Mainnet]: `Mainnet`,
  [SupportedNetworks.Kovan]: `Kovan`,
  [SupportedNetworks.Ropsten]: `Ropsten`,
  [SupportedNetworks.Avalanche]: 'Avalanche',
  [SupportedNetworks.Arbitrum]: 'Arbitrum',
  [SupportedNetworks.Matic]: 'Polygon',
  [SupportedNetworks.Optimism]: 'Optimism',
}
