import { ribbon } from '../../../constants/teamTokens'
import { AdditionalData } from '../../common'
import { Adaptor } from '../../interface'
import { Direction, OptionType, Protocols, UnderlyingAsset, USDC, ETH, findTokenByAddress } from '../../../constants'
import { DovPosition } from '../../../types'
import BigNumber from 'bignumber.js'
import { querySubgraph } from '../../utils'
import { rbnSupportedNetworks, networkToSubgraphEndpoint, getVaults, getVaultShort } from './constants'
import { RibbonShortVault, RibbonVaultAccount } from './types'
export class RibbonAdaptor implements Adaptor {
  teamToken = ribbon

  img = require('../../../imgs/protocol-icons/ribbon.svg')

  url = 'https://www.ribbon.finance/'

  async getPositionsByUnderlying(account: string, underlying, additionalData: AdditionalData) {
    return []
  }

  async getDovPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<DovPosition[]> {
    const dovPositions: DovPosition[] = []

    for (const network of rbnSupportedNetworks) {
      const endpoint = networkToSubgraphEndpoint(network)
      const vaults = (await querySubgraph(endpoint, getVaults(account)))['vaultAccounts'] as RibbonVaultAccount[]
      const vaultsWithUnderlying = vaults.filter(
        v => findTokenByAddress(v.vault.underlyingAsset, network)?.asset === underlying,
      )

      for (const vaultAccount of vaultsWithUnderlying) {
        const shortPositions = (await querySubgraph(endpoint, getVaultShort(vaultAccount.vault.id)))[
          'vaultShortPositions'
        ] as RibbonShortVault[]

        if (shortPositions.length === 0) continue
        const short = shortPositions[0]

        // how much i own compared to full amount
        const vaultRatio = new BigNumber(vaultAccount.totalBalance).div(vaultAccount.vault.totalBalance)
        const myShortAmount = new BigNumber(short.mintAmount).times(vaultRatio).div(1e8) // divided by otoken decimals
        console.log(`myShortAmount`, myShortAmount.toString())

        dovPositions.push({
          id: vaultAccount.id,
          name: vaultAccount.vault.name,
          balance: myShortAmount,
          protocol: Protocols.Ribbon,
          // each ribbon vault has only 1 position
          positions: [
            {
              strikePrice: new BigNumber(short.strikePrice).div(1e8),
              expiry: new BigNumber(short.expiry).toNumber(),
              type: OptionType.Call,
              direction: Direction.Short,
              amount: myShortAmount,
              underlying: ETH,
              strike: USDC,
            },
          ],
          collateral: ETH,
          chainId: network,
          collateralAmount: new BigNumber(vaultAccount.totalBalance), // amount deposited as collateral
          additionalData: undefined,
        })
      }
    }

    return dovPositions
  }

  async getUserNonERC20Tokens(account: string) {
    return []
  }

  getLinkToPosition(positionId: string): undefined | string {
    return undefined
  }
}

export default RibbonAdaptor
