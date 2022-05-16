import { SupportedNetworks } from '../../../constants'

export const lyraStrikeScale = 18
export const lyraPositionScale = 18

export const lyraSupportedNetworks = [SupportedNetworks.OpKovan]

export const subgraph = 'https://api.thegraph.com/subgraphs/name/opynfinance/squeeth'

export const wSqueethAddress = '0xf1B99e3E573A1a9C5E6B2Ce818b617F0E664E86B'

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
