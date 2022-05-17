import { sETH, sBTC, SupportedNetworks, UnderlyingAsset, sLINK } from '../../../constants'
import { Token } from '../../../types'

export const lyraStrikeScale = 18
export const lyraPositionScale = 18

export const lyraSupportedNetworks = [SupportedNetworks.OpKovan]

export const marketIdToPathMap: { [key: string]: string } = {
  '0xf24ecf73fd8e7fc9d8f94cd9df4f03107704d309': 'eth', // testnet kovan
}

export const underlyingToLyraBaseAsset = (asset: UnderlyingAsset): Token | undefined => {
  if (asset === UnderlyingAsset.ETH) return sETH
  if (asset === UnderlyingAsset.BTC) return sBTC
  if (asset === UnderlyingAsset.LINK) return sLINK
}

export const marketIdToPath = (marketId: string) => {
  const defaultPath = 'eth'
  return marketIdToPathMap[marketId] || defaultPath
}

export const opSubgraph = 'https://api.thegraph.com/subgraphs/name/lyra-finance/mainnet'

export const getAccountPositionsQuery = (address: string) => {
  return `
  {
    positions(
      first:1000, 
      where: {
      owner: "${address}",
    }) {
      id
      positionId
      option {
        isCall
      }
      market {
        id
        baseAddress
        quoteAddress
      }
      strike {
        strikePrice
      }
      board {
        expiryTimestamp
      }
      size
      isBaseCollateral
      collateral
      isLong
    }
  }
  
  `
}
