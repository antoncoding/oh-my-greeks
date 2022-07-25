import {
  Direction,
  OptionType,
  Protocols,
  SupportedNetworks,
  UnderlyingAsset,
  sETH,
  findTokenByAddress,
  sUSD,
} from '../../../constants'
import BigNumber from 'bignumber.js'
import { Position, DovPosition } from '../../../types'
import { toTokenAmount } from '../../../utils/math'
import { Adaptor } from '../../interface'
import { querySubgraph } from '../../utils'
import {
  getAccountPositionsQuery,
  lyraPositionScale,
  lyraStrikeScale,
  marketIdToPath,
  opSubgraph,
  underlyingToLyraBaseAsset,
} from './constants'
import { lyra } from '../../../constants/teamTokens'
import { LyraPosition } from './types'
import { AdditionalData } from '../../common'

export class LyraAdaptor implements Adaptor {
  teamToken = lyra

  img = require('../../../imgs/protocol-icons/lyra.png')

  url = 'https://www.lyra.finance/'

  async getPositionsByUnderlying(
    account: string,
    underlying: UnderlyingAsset,
    additionalData?: AdditionalData,
  ): Promise<Position[]> {
    // todo: optimize query to filter non-underlying result from subgraph
    const lyraPositions = (await querySubgraph(opSubgraph, getAccountPositionsQuery(account)))[
      'positions'
    ] as LyraPosition[]

    const result = lyraPositions
      .map(p => this.toPosition(p))
      .filter(p => p.amount.gt(0))
      .filter(p => underlyingToLyraBaseAsset(underlying) === p.underlying)

    return result
  }

  async getDovPositionsByUnderlying(
    account: string,
    underlying: UnderlyingAsset,
    additionalData?: AdditionalData,
  ): Promise<DovPosition[]> {
    return []
  }

  /**
   * get lyra token balance
   * @param account
   * @returns
   */
  async getUserNonERC20Tokens(account: string) {
    return []
  }

  getLinkToPosition(subgraphPositionId: string): undefined | string {
    const [marketId, positionId] = subgraphPositionId.split('-')
    const marketPath = marketIdToPath(marketId)
    return `https://app.lyra.finance/position/${marketPath}/${positionId}`
  }

  toPosition(lyraPosition: LyraPosition): Position {
    return {
      id: lyraPosition.id,
      chainId: SupportedNetworks.Optimism,
      protocol: Protocols.Lyra,
      strikePrice: toTokenAmount(lyraPosition.strike.strikePrice, lyraStrikeScale),
      expiry: lyraPosition.board.expiryTimestamp,
      type: lyraPosition.option.isCall ? OptionType.Call : OptionType.Put, // call or put
      direction: lyraPosition.isLong ? Direction.Long : Direction.Short, // long or short
      amount: toTokenAmount(lyraPosition.size, lyraPositionScale),
      strike: findTokenByAddress(lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
      underlying: findTokenByAddress(lyraPosition.market.baseAddress, SupportedNetworks.Optimism),
      collateral: lyraPosition.isBaseCollateral ? sETH : sUSD,
      // collateral: findTokenByAddress(lyraPosition.isBaseCollateral ? lyraPosition.market.baseAddress : lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
      collateralAmount: new BigNumber(lyraPosition.collateral),
      additionalData: undefined,
    }
  }
}

export default LyraAdaptor
