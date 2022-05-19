import { SupportedNetworks } from '../../../constants'

export const lyraStrikeScale = 18
export const lyraPositionScale = 18

export const lyraSupportedNetworks = [SupportedNetworks.OpKovan]

export const subgraph = 'https://api.thegraph.com/subgraphs/name/opynfinance/squeeth'

export const wSqueethAddress = '0xf1b99e3e573a1a9c5e6b2ce818b617f0e664e86b'

export const getSqueethVaultsQuery = (address: string) => {
  return `
  {
    vaults(where: {owner: "${address}"}) {
      id
      shortAmount
      collateralAmount
      NftCollateralId
    }
  }
  `
}
