import { sETH, sBTC, SupportedNetworks, UnderlyingAsset } from '../../../constants'
import { Token } from '../../../types'

export const lyraStrikeScale = 18
export const lyraPositionScale = 18

export const lyraSupportedNetworks = [SupportedNetworks.OpKovan]

export const underlyingToLyraBaseAsset = (asset: UnderlyingAsset): Token | undefined => {
  if (asset === UnderlyingAsset.ETH) return sETH
  if (asset === UnderlyingAsset.BTC) return sBTC
  if (asset === UnderlyingAsset.LINK) return sBTC
}

// todo: change this to production
export const opSubgraph = 'https://api.thegraph.com/subgraphs/name/lyra-finance/kovan'

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
