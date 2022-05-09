import { SupportedNetworks } from './networks'
import { Token } from '../types/index'

type Tokens = {
  [key in SupportedNetworks]: Token[]
}

const isPublic = process.env.REACT_APP_PUBLIC === 'true'
export const ZERO_ADDR = '0x0000000000000000000000000000000000000000'

export const eth: Token = {
  name: 'Ether',
  id: ZERO_ADDR,
  symbol: 'ETH',
  decimals: 18,
}

export const tokens: Tokens = {
  [SupportedNetworks.Mainnet]: [
    eth,
    {
      name: 'USDC',
      id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      symbol: 'WBTC',
      decimals: 8,
    },
    {
      name: 'yvUSDC',
      id: '0x5f18c75abdae578b483e5f43f12a39cf75b973a9',
      symbol: 'yvUSDC',
      decimals: 6,
    },
  ],
  [SupportedNetworks.Ropsten]: [
    eth,
    {
      name: 'Opyn USDC',
      id: '0x27415c30d8c87437becbd4f98474f26e712047f4',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xc778417e063141139fce010982780140aa0cd5ab',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Opyn Wrapped Bitcoin',
      id: '0xe477d1ffc1e5ea6a577846a4699617997315b4ee',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
  [SupportedNetworks.Kovan]: [
    eth,
    {
      name: 'USDC',
      id: '0x7e6eda50d1c833be936492bf42c1bf376239e9e2',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0xd0a1e359811322d97991e03f863a0c30c2cf029c',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0x50570256f0da172a1908207aaf0c80d4b279f303',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
  [SupportedNetworks.Avalanche]: [
    {
      name: 'Wrapped AVAX',
      id: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
      symbol: 'WAVAX',
      decimals: 18,
    },
    {
      name: 'USDC',
      id: '0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664',
      symbol: 'USDC',
      decimals: 6,
    },
  ],
  [SupportedNetworks.Arbitrum]: [
    {
      name: 'USDC',
      id: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: 'Wrapped Bitcoin',
      id: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
  [SupportedNetworks.Matic]: [
    {
      name: 'USDC',
      id: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      symbol: 'USDC',
      decimals: 6,
    },
    {
      name: 'Wrapped Ether',
      id: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      symbol: 'WETH',
      decimals: 18,
    },
    {
      name: '(POS) Wrapped Bitcoin',
      id: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      symbol: 'WBTC',
      decimals: 8,
    },
  ],
  [SupportedNetworks.Optimism]: [],
}

type SystemAddresses = {
  [key in SupportedNetworks]: {
    controller: string
    calculator: string
    factory: string
    addressBook: string
    whitelist: string
    pool: string
    zeroxExchange: string
  }
}

export const getETHAggregators = (networkId: SupportedNetworks) => {
  if (networkId === SupportedNetworks.Mainnet) return '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'
  if (networkId === SupportedNetworks.Kovan) return '0x9326BFA02ADD2366b30bacB125260Af641031331'
  return ''
}

export const getPrimaryPaymentToken = (networkId: SupportedNetworks) => {
  return tokens[networkId].find(t => t.symbol === 'USDC') as Token
}

export const getUSDC = (networkId: SupportedNetworks) => {
  return tokens[networkId].find(t => t.symbol === 'USDC') || eth
}

export const getWeth = (networkId: SupportedNetworks) => {
  // return the wrapped native token
  return tokens[networkId].find(t => t.symbol === 'WETH' || t.symbol === 'WAVAX') as Token
}
