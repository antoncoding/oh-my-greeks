import { SupportedNetworks } from '../../../constants'

export const positionScale = 18

export const premiaSupportedNetworks = [SupportedNetworks.Arbitrum, SupportedNetworks.Mainnet]

export const networkToSubgraphEndpoint = (network: SupportedNetworks): string | undefined => {
  if (network === SupportedNetworks.Arbitrum)
    return 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-arbitrum'
  if (network === SupportedNetworks.Mainnet) return 'https://api.thegraph.com/subgraphs/name/premiafinance/premiav2'
  return undefined
}

export const getAccountTokensQuery = (address: string) => {
  return `
  {
    userOwnedOptions (first: 1000, where:{
      user: "${address}"
    }){
      id
      user
      size
      option {
      id
        maturity
        strike
      underlying {
        symbol
        id
      }
      base {
        symbol
        id
      }
      optionType
    }
  }
}
  `
}
