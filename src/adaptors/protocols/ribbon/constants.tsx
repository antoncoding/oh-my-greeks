import { SupportedNetworks } from '../../../constants'

export const ribbonScale = 18

export const rbnSupportedNetworks = [SupportedNetworks.Mainnet]

export const networkToSubgraphEndpoint = (network: SupportedNetworks): string | undefined => {
  if (network === SupportedNetworks.Mainnet) return 'https://api.thegraph.com/subgraphs/name/ribbon-finance/ribbon-v2'
  return undefined
}

export const getVaults = (address: string) => {
  return `
{
  vaultAccounts(where: {
    account: "0xc08922a77140ce1aa91d419f4ac2ddc853575511"
    totalBalance_gt: 2
  }) {
    id
    shares
    totalStakedShares
    totalBalance
    vault {
      name
      id
      underlyingAsset
      totalBalance
  }
  }
}
  `
}

export const getVaultShort = (vault: string) => {
  return `
  {
    vaultShortPositions(
      first: 1,
      where: {
        vault: "${vault}"
        closedAt: null
      }, 
      orderBy: openedAt
      orderDirection: desc
    ) {
      option 
      strikePrice
      expiry
      mintAmount
    }
  }
  
`
}
