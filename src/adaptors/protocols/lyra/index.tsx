import {
  Direction,
  OptionType,
  Protocols,
  SupportedNetworks,
  UnderlyingAsset,
  USDC,
  sETH,
  findTokenByAddress,
} from '../../../constants'
import { Position } from '../../../types'
import { toTokenAmount } from '../../../utils/math'
import { Adaptor } from '../../interface'
import { querySubgraph } from '../../utils'
import {
  getAccountPositionsQuery,
  lyraPositionScale,
  lyraStrikeScale,
  opSubgraph,
  underlyingToLyraBaseAsset,
} from './constants'
import { LyraPosition } from './types'

export class LyraAdaptor implements Adaptor {
  async getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
    // todo: optimize query to filter non-underlying result from subgraph
    const lyraPositions = (await querySubgraph(opSubgraph, getAccountPositionsQuery(account)))[
      'positions'
    ] as LyraPosition[]
    return lyraPositions
      .map(p => this.toPosition(p))
      .filter(p => underlyingToLyraBaseAsset(underlying) === p.underlying)
  }

  toPosition(lyraPosition: LyraPosition): Position {
    return {
      id: lyraPosition.id,
      chainId: SupportedNetworks.OpKovan,
      protocol: Protocols.Lyra,
      strikePrice: toTokenAmount(lyraPosition.strike.strikePrice, lyraStrikeScale),
      expiry: lyraPosition.board.expiryTimestamp,
      type: lyraPosition.option.isCall ? OptionType.Call : OptionType.Put, // call or put
      direction: lyraPosition.isLong ? Direction.Long : Direction.Short, // long or short
      amount: toTokenAmount(lyraPosition.size, lyraPositionScale),
      // todo: change these after mainnet, they won't work on testnet
      strike: findTokenByAddress(lyraPosition.market.baseAddress, SupportedNetworks.OpKovan),
      underlying: findTokenByAddress(lyraPosition.market.baseAddress, SupportedNetworks.OpKovan),
      collateral: lyraPosition.isBaseCollateral ? sETH : USDC,
      // collateral: findTokenByAddress(lyraPosition.isBaseCollateral ? lyraPosition.market.baseAddress : lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
      collateralAmount: toTokenAmount(lyraPosition.collateral, lyraPositionScale),
    }
  }
}

export default LyraAdaptor
