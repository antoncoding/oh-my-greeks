import { SupportedNetworks } from '../../../constants'

export const lyraStrikeScale = 18
export const lyraPositionScale = 18

export const lyraSupportedNetworks = [SupportedNetworks.Optimism]

// todo: change this to production
export const opMainnetSubgraph = 'https://api.thegraph.com/subgraphs/name/lyra-finance/kovan'

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
