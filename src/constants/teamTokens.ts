// list of tokens shown in "Tokens" page
import { TeamToken } from '../types'
import { SupportedNetworks } from './networks'

export const lyra: TeamToken = {
  name: 'Lyra Token',
  symbol: 'LYRA',
  coingeckoId: 'lyra-finance',
  themeColor: '#05c99b',
  decimals: 18,
  img: require('../imgs/protocol-icons/lyra.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x01ba67aac7f75f647d94220cc98fb30fcc5105bf',
    [SupportedNetworks.Optimism]: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  },
}

export const ribbon: TeamToken = {
  name: 'Ribbon',
  symbol: 'RBN',
  coingeckoId: 'ribbon-finance',
  themeColor: '#FC0A54',
  decimals: 18,
  img: require('../imgs/protocol-icons/ribbon.svg'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x6123b0049f904d730db3c36a31167d9d4121fa6b',
  },
}

export const premia: TeamToken = {
  name: 'Premia',
  symbol: 'PREMIA',
  coingeckoId: 'premia',
  themeColor: '#5294FF',
  decimals: 18,
  img: require('../imgs/protocol-icons/premia.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
  },
}

export const allProjectTokens = [lyra, premia, ribbon]
