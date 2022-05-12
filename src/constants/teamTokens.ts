// list of tokens shown in "Tokens" page
import { Token } from '../types'
import { UnderlyingAsset } from './enums'
import { SupportedNetworks } from './networks'

export const lyraToken: Token = {
  name: 'Synth Ether',
  symbol: 'sETH',
  asset: UnderlyingAsset.ETH,
  decimals: 18,
  img: require('../imgs/token-icons/sETH.webp'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    [SupportedNetworks.OpKovan]: '0x13414675e6e4e74ef62eaa9ac81926a3c1c7794d',
    [SupportedNetworks.Optimism]: '0xe405de8f52ba7559f9df3c368500b6e6ae6cee49',
  },
}
