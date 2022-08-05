import Optimism from '../imgs/chain-icons/optimism.png'
import Arbitrum from '../imgs/chain-icons/arbitrum.svg'
import Matic from '../imgs/chain-icons/matic.svg'

import AVAX from '../imgs/token-icons/WAVAX.webp'
import Ethereum from '../imgs/token-icons/Ethereum.png'

export enum SupportedNetworks {
  Mainnet = '0x1',
  Ropsten = '0x3',
  Optimism = '0xa',
  OpKovan = '0x45',
  Matic = '0x89',
  Avalanche = '0xa86a',
  Arbitrum = '0xa4b1',
}

export const networkIdToExplorer = {
  [SupportedNetworks.Mainnet]: 'https://etherscan.io',
  [SupportedNetworks.Ropsten]: 'https://ropsten.etherscan.io',
  [SupportedNetworks.OpKovan]: 'https://kovan.optimism.io/',
  [SupportedNetworks.Optimism]: 'https://optimistic.etherscan.io',
  [SupportedNetworks.Avalanche]: 'https://snowtrace.io',
  [SupportedNetworks.Arbitrum]: 'https://arbiscan.io',
  [SupportedNetworks.Matic]: 'https://polygonscan.com',
}

export const networkToLogo: { [key in SupportedNetworks]: string } = {
  [SupportedNetworks.Mainnet]: Ethereum,
  [SupportedNetworks.OpKovan]: Optimism,
  [SupportedNetworks.Ropsten]: Ethereum,
  [SupportedNetworks.Avalanche]: AVAX,
  [SupportedNetworks.Arbitrum]: Arbitrum,
  [SupportedNetworks.Matic]: Matic,
  [SupportedNetworks.Optimism]: Optimism,
}

export const isMainnet: { [key in SupportedNetworks]: boolean } = {
  [SupportedNetworks.Mainnet]: true,
  [SupportedNetworks.OpKovan]: false,
  [SupportedNetworks.Ropsten]: false,
  [SupportedNetworks.Avalanche]: true,
  [SupportedNetworks.Arbitrum]: true,
  [SupportedNetworks.Matic]: true,
  [SupportedNetworks.Optimism]: true,
}

export const isSupportedByMetaMask = (network: SupportedNetworks) => {
  if (network === SupportedNetworks.Mainnet || network === SupportedNetworks.Ropsten) return true
  return false
}

export const networkToTokenConfig = (networkId: SupportedNetworks) => {
  if (isSupportedByMetaMask(networkId)) return undefined
  if (networkId === SupportedNetworks.Avalanche)
    return {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    }
  if (networkId === SupportedNetworks.Arbitrum)
    return {
      name: 'Arbitrum ETH',
      symbol: 'AETH',
      decimals: 18,
    }
  if (networkId === SupportedNetworks.Matic)
    return {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    }
}
