import {
  Direction,
  OptionType,
  Protocols,
  SupportedNetworks,
  UnderlyingAsset,
  USDC,
  ETH,
  networkToProvider,
} from '../../../constants'
import BigNumber from 'bignumber.js'
import { Position } from '../../../types'
import { toTokenAmount } from '../../../utils/math'
import { Adaptor } from '../../interface'
import { querySubgraph } from '../../utils'
import { getSqueethVaultsQuery, subgraph, wSqueethAddress } from './constants'
import { SqueethVault } from './types'
import Web3 from 'web3'

const ERC20Abi = require('../../../constants/abis/erc20.json')

export class OpynAdaptor implements Adaptor {
  teamToken = undefined

  img = require('../../../imgs/protocol-icons/opyn.png')

  url = 'https://opyn.co/'

  // todo: update
  normFactor = 0.67

  async getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
    const vaults = (await querySubgraph(subgraph, getSqueethVaultsQuery(account)))['vaults'] as SqueethVault[]

    const shorts = vaults
      .map(p => this.vaultToShort(p))
      .filter(p => p.amount.gt(0))
      .filter(p => p.underlying.asset === underlying)

    const longAmount = await this.getLong(account)
    if (longAmount.isZero()) return shorts

    return shorts.concat([
      {
        id: `long-squeeth`,
        chainId: SupportedNetworks.Mainnet,
        protocol: Protocols.Opyn,
        strikePrice: new BigNumber(0),
        expiry: 0,
        type: OptionType.PowerPerp,
        direction: Direction.Long,
        amount: toTokenAmount(longAmount, 18),
        strike: USDC,
        underlying: ETH,
        collateral: undefined,
        collateralAmount: new BigNumber(0),
        additionalData: this.normFactor,
      },
    ])
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
    return undefined
    // const [marketId, positionId] = subgraphPositionId.split('-')
    // const marketPath = marketIdToPath(marketId)
    // return `https://avalon.app.lyra.finance/position/${marketPath}/${positionId}`
  }

  async getLong(account: string) {
    const web3 = new Web3(networkToProvider[SupportedNetworks.Mainnet])
    const contract = new web3.eth.Contract(ERC20Abi, wSqueethAddress)
    const rawBalance = await contract.methods.balanceOf(account).call()
    return new BigNumber(rawBalance)
  }

  vaultToShort(vault: SqueethVault): Position {
    return {
      id: `short-${vault.id}`,
      chainId: SupportedNetworks.Mainnet,
      protocol: Protocols.Opyn,
      strikePrice: new BigNumber(0),
      expiry: 0,
      type: OptionType.PowerPerp,
      direction: Direction.Short,
      amount: toTokenAmount(vault.shortAmount, 18),
      strike: USDC,
      underlying: ETH,
      collateral: ETH,
      // collateral: findTokenByAddress(lyraPosition.isBaseCollateral ? lyraPosition.market.baseAddress : lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
      collateralAmount: new BigNumber(vault.collateralAmount),
      additionalData: this.normFactor,
    }
  }
}

export default OpynAdaptor
