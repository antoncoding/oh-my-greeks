import { ribbon } from '../../../constants/teamTokens'
import { AdditionalData } from '../../common'
import { Adaptor } from '../../interface'
import { Direction, OptionType, Protocols, SupportedNetworks, UnderlyingAsset, USDC, ETH } from '../../../constants'
import { DovPosition } from '../../../types'
import BigNumber from 'bignumber.js'
export class RibbonAdaptor implements Adaptor {
  teamToken = ribbon

  img = require('../../../imgs/protocol-icons/ribbon.svg')

  url = 'https://www.ribbon.finance/'

  async getPositionsByUnderlying(account: string, underlying, additionalData: AdditionalData) {
    return []
  }

  async getDovPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<DovPosition[]> {
    return [
      {
        id: 'string',
        name: 'rETH-THETA',
        balance: new BigNumber(9.9),
        protocol: Protocols.Ribbon,
        positions: [
          {
            strikePrice: new BigNumber(2000),
            expiry: Date.now() / 1000 + 864000,
            type: OptionType.Call,
            direction: Direction.Short,
            amount: new BigNumber(10),
            underlying: ETH,
            strike: USDC,
          },
          {
            strikePrice: new BigNumber(1800),
            expiry: Date.now() / 1000 + 864000,
            type: OptionType.Call,
            direction: Direction.Short,
            amount: new BigNumber(10),
            underlying: ETH,
            strike: USDC,
          },
        ],
        collateral: ETH,
        chainId: SupportedNetworks.Mainnet,
        collateralAmount: new BigNumber(10),
        additionalData: undefined,
      },
    ]
  }

  async getUserNonERC20Tokens(account: string) {
    return []
  }

  getLinkToPosition(positionId: string): undefined | string {
    return undefined
  }
}

export default RibbonAdaptor
