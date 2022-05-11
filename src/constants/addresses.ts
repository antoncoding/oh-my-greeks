import { SupportedNetworks } from './networks'
import { Token } from '../types/index'
import { UnderlyingAsset } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const underlyingToPrimaryAddress = (underlying: UnderlyingAsset): string => {
  if (underlying === UnderlyingAsset.ETH) return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  if (underlying === UnderlyingAsset.BTC) return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  if (underlying === UnderlyingAsset.LINK) return '0x514910771af9ca656af840dff83e8264ecf986ca'
  // if (underlying === UnderlyingAsset.AVAX) return '0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9'
  if (underlying === UnderlyingAsset.LUNA) return '0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9'
  return ZERO_ADDR
}

export const underlyingToIcon = (underlying: UnderlyingAsset): string => {
  if (underlying === UnderlyingAsset.ETH) return require('../imgs/ETH.png')
  if (underlying === UnderlyingAsset.BTC) return require('../imgs/WBTC.png')
  if (underlying === UnderlyingAsset.LINK) return require('../imgs/LINK.png')
  if (underlying === UnderlyingAsset.LUNA) return require('../imgs/LUNA.png')
  // if (underlying === UnderlyingAsset.AVAX) return require('../imgs/WAVAX.webp')
  return ZERO_ADDR
}

export const ETH: Token = {
  name: 'Ether',
  symbol: 'ETH',
  asset: UnderlyingAsset.ETH,
  decimals: 18,
  img: require('../imgs/ETH.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: ZERO_ADDR,
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: ZERO_ADDR,
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const sETH: Token = {
  name: 'Synth Ether',
  symbol: 'sETH',
  asset: UnderlyingAsset.ETH,
  decimals: 18,
  img: require('../imgs/sETH.webp'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb',
    [SupportedNetworks.OpKovan]: '0x13414675e6e4e74ef62eaa9ac81926a3c1c7794d',
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: '0xe405de8f52ba7559f9df3c368500b6e6ae6cee49',
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const WETH: Token = {
  name: 'Wrapped Ether',
  symbol: 'WETH',
  asset: UnderlyingAsset.ETH,
  decimals: 18,
  img: require('../imgs/ETH.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    [SupportedNetworks.OpKovan]: '0x4200000000000000000000000000000000000006',
    [SupportedNetworks.Ropsten]: '0xc778417e063141139fce010982780140aa0cd5ab',
    [SupportedNetworks.Arbitrum]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    [SupportedNetworks.Optimism]: '0x4200000000000000000000000000000000000006',
    [SupportedNetworks.Avalanche]: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
    [SupportedNetworks.Matic]: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
  },
}

export const sBTC: Token = {
  name: 'Synth Bitcoin',
  symbol: 'sBTC',
  asset: UnderlyingAsset.BTC,
  decimals: 8,
  img: require('../imgs/WBTC.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6',
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: '0x298b9b95708152ff6968aafd889c6586e9169f1d',
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const WBTC: Token = {
  name: 'Wrapped Bitcoin',
  symbol: 'WBTC',
  asset: UnderlyingAsset.BTC,
  decimals: 8,
  img: require('../imgs/WBTC.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: '0xe477d1ffc1e5ea6a577846a4699617997315b4ee',
    [SupportedNetworks.Arbitrum]: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    [SupportedNetworks.Optimism]: '0x68f180fcce6836688e9084f035309e29bf0a2095',
    [SupportedNetworks.Avalanche]: '0x50b7545627a5162f82a992c33b87adc75187b218',
    [SupportedNetworks.Matic]: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
  },
}

export const USDC: Token = {
  name: 'USDC',
  symbol: 'USDC',
  asset: UnderlyingAsset.USD,
  decimals: 6,
  img: require('../imgs/USDC.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    [SupportedNetworks.OpKovan]: '0x1147b3f6eca313a5b3c2aa3fb85928104a5787d3',
    [SupportedNetworks.Ropsten]: '',
    [SupportedNetworks.Arbitrum]: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    [SupportedNetworks.Optimism]: '0x68f180fcce6836688e9084f035309e29bf0a2095',
    [SupportedNetworks.Avalanche]: '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e',
    [SupportedNetworks.Matic]: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  },
}

export const sUSD: Token = {
  name: 'synth USD',
  symbol: 'sUSD',
  asset: UnderlyingAsset.USD,
  decimals: 6,
  img: require('../imgs/USDC.png'), // need update
  addresses: {
    [SupportedNetworks.Mainnet]: ZERO_ADDR,
    [SupportedNetworks.OpKovan]: '0x1147b3f6eca313a5b3c2aa3fb85928104a5787d3',
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: '0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9',
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const DAI: Token = {
  name: 'Dai',
  symbol: 'DAI',
  asset: UnderlyingAsset.USD,
  decimals: 18,
  img: require('../imgs/DAI.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x6b175474e89094c44da98b954eedeac495271d0f',
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    [SupportedNetworks.Optimism]: '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
    [SupportedNetworks.Avalanche]: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
    [SupportedNetworks.Matic]: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
  },
}

export const LINK: Token = {
  name: 'Chainlink Token',
  symbol: 'LINK',
  asset: UnderlyingAsset.LINK,
  decimals: 18,
  img: require('../imgs/LINK.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: '0xf97f4df75117a78c1a5a0dbb814af92458539fb4',
    [SupportedNetworks.Optimism]: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
    [SupportedNetworks.Avalanche]: '0x5947bb275c521040051d82396192181b413227a3',
    [SupportedNetworks.Matic]: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
  },
}

export const sLINK: Token = {
  name: 'Synth LINK',
  symbol: 'sLINK',
  asset: UnderlyingAsset.LINK,
  decimals: 18,
  img: require('../imgs/LINK.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: ZERO_ADDR,
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: '0xc5db22719a06418028a40a9b5e9a7c02959d0d08',
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const LUNA: Token = {
  name: 'Wrapped Luna Token',
  symbol: 'LUNA',
  asset: UnderlyingAsset.LUNA,
  decimals: 18,
  img: require('../imgs/LUNA.png'),
  addresses: {
    [SupportedNetworks.Mainnet]: '0xd2877702675e6ceb975b4a1dff9fb7baf4c91ea9',
    [SupportedNetworks.OpKovan]: ZERO_ADDR,
    [SupportedNetworks.Ropsten]: ZERO_ADDR,
    [SupportedNetworks.Arbitrum]: ZERO_ADDR,
    [SupportedNetworks.Optimism]: ZERO_ADDR,
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
    [SupportedNetworks.Matic]: ZERO_ADDR,
  },
}

export const allTokens = [ETH, WETH, WBTC, USDC, LINK, DAI, sETH, sBTC, sLINK, LUNA]

export function findLinkedAssetByAddress(address: string, networkId: SupportedNetworks) {
  for (const token of allTokens) {
    if (token.addresses[networkId] === address) {
      return token.asset
    }
  }
  return undefined
}

export function findTokenByAddress(address: string, networkId: SupportedNetworks) {
  for (const token of allTokens) {
    if (token.addresses[networkId] === address) return token
  }
  return undefined
}
