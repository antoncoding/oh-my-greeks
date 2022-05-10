import { SupportedNetworks } from './networks'
import { Token } from '../types/index'
import { UnderlyingAsset } from './enums'

export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const underlyingToPrimaryAddress = (underlying: UnderlyingAsset): string => {
  if (underlying === UnderlyingAsset.ETH) return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
  if (underlying === UnderlyingAsset.BTC) return '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599'
  if (underlying === UnderlyingAsset.LINK) return '0x514910771af9ca656af840dff83e8264ecf986ca'
  return ZERO_ADDR
}

export const underlyingToIcon = (underlying: UnderlyingAsset): string => {
  if (underlying === UnderlyingAsset.ETH) return require('../imgs/ETH.png')
  if (underlying === UnderlyingAsset.BTC) return require('../imgs/WBTC.png')
  if (underlying === UnderlyingAsset.LINK) return require('../imgs/LINK.png')
  if (underlying === UnderlyingAsset.AVAX) return require('../imgs/WAVAX.webp')
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
    [SupportedNetworks.Kovan]: ZERO_ADDR,
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
    [SupportedNetworks.Kovan]: ZERO_ADDR,
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
    [SupportedNetworks.Kovan]: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
    [SupportedNetworks.Ropsten]: '0xc778417e063141139fce010982780140aa0cd5ab',
    [SupportedNetworks.Arbitrum]: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
    [SupportedNetworks.Optimism]: '0x4200000000000000000000000000000000000006',
    [SupportedNetworks.Avalanche]: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
    [SupportedNetworks.Matic]: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
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
    [SupportedNetworks.Kovan]: '0x50570256f0da172a1908207aaf0c80d4b279f303',
    [SupportedNetworks.Ropsten]: '0xe477d1ffc1e5ea6a577846a4699617997315b4ee',
    [SupportedNetworks.Arbitrum]: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
    [SupportedNetworks.Optimism]: '0x68f180fcce6836688e9084f035309e29bf0a2095',
    [SupportedNetworks.Avalanche]: ZERO_ADDR,
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
    [SupportedNetworks.Mainnet]: '',
    [SupportedNetworks.Kovan]: '',
    [SupportedNetworks.Ropsten]: '',
    [SupportedNetworks.Arbitrum]: '',
    [SupportedNetworks.Optimism]: '0x68f180fcce6836688e9084f035309e29bf0a2095',
    [SupportedNetworks.Avalanche]: '',
    [SupportedNetworks.Matic]: '',
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
    [SupportedNetworks.Kovan]: '',
    [SupportedNetworks.Ropsten]: '',
    [SupportedNetworks.Arbitrum]: '',
    [SupportedNetworks.Optimism]: '0x350a791bfc2c21f9ed5d10980dad2e2638ffa7f6',
    [SupportedNetworks.Avalanche]: '',
    [SupportedNetworks.Matic]: '',
  },
}

export const allTokens = [ETH, WBTC, USDC, LINK]
