// list of tokens shown in "Tokens" page
import { ERC20 } from '../types'
import { SupportedNetworks } from './networks'

export const lyra: ERC20 = {
  name: 'Lyra Token',
  symbol: 'LYRA',
  decimals: 18,
  img: require('../imgs/protocol-icons/lyra.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x01ba67aac7f75f647d94220cc98fb30fcc5105bf',
    [SupportedNetworks.Optimism]: '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb',
  },
}

export const ribbon: ERC20 = {
  name: 'Ribbon',
  symbol: 'RBN',
  decimals: 18,
  img: require('../imgs/protocol-icons/ribbon.svg'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x6123b0049f904d730db3c36a31167d9d4121fa6b',
  },
}

export const xPremia: ERC20 = {
  name: 'xPremia',
  symbol: 'xPREMIA',
  decimals: 18,
  img: require('../imgs/protocol-icons/premia.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0xF1bB87563A122211d40d393eBf1c633c330377F9',
  },
}

export const premia: ERC20 = {
  name: 'Premia',
  symbol: 'PREMIA',
  decimals: 18,
  img: require('../imgs/protocol-icons/premia.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x6399c842dd2be3de30bf99bc7d1bbf6fa3650e70',
  },
}

export const allProjectTokens = [lyra, premia, xPremia, ribbon]
