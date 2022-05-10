import BigNumber from 'bignumber.js'
import { Direction, OptionType, Protocols, SupportedNetworks, UnderlyingAsset, USDC, sETH } from '../../../constants'
import { Position } from '../../../types'
import { Adaptor } from '../../interface'
import { querySubgraph } from '../../utils'
import { getAccountTokensQuery, subgraphArbi } from './constants'

export class PremiaAdaptor implements Adaptor {
  async getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
    const arbiPositions = (await querySubgraph(subgraphArbi, getAccountTokensQuery(account.toLowerCase())))['userOwnedOptions']
    console.log(`arbiPositions`, arbiPositions)
    return [
      {
        id: '',
        chainId: SupportedNetworks.Arbitrum,
        protocol: Protocols.Premia,
        strikePrice: new BigNumber(2800),
        expiry: 1654063200,
        type: OptionType.Put, // call or put
        direction: Direction.Long, // long or short
        amount: new BigNumber(8),
        strike: USDC,
        collateral: USDC,
        underlying: sETH,
        collateralAmount: new BigNumber(0),
      },
      {
        id: '',
        chainId: SupportedNetworks.Arbitrum,
        protocol: Protocols.Premia,
        strikePrice: new BigNumber(2400),
        expiry: 1652824800,
        type: OptionType.Call, // call or put
        direction: Direction.Long, // long or short
        amount: new BigNumber(1),
        strike: USDC,
        collateral: USDC,
        underlying: sETH,
        collateralAmount: new BigNumber(0),
      },
    ]
  }
}

export default PremiaAdaptor
