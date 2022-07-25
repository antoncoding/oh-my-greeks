import {
  Direction,
  OptionType,
  Protocols,
  SupportedNetworks,
  UnderlyingAsset,
  USDC,
  ETH,
  networkToProvider,
  allTokens,
} from '../../../constants'
import BigNumber from 'bignumber.js'
import { Position, DovPosition, Token } from '../../../types'
import { toTokenAmount } from '../../../utils/math'
import { Adaptor } from '../../interface'
import { querySubgraph } from '../../utils'
import { getSqueethVaultsQuery, subgraph, wSqueethAddress } from './constants'
import { SqueethVault } from './types'
import Web3 from 'web3'
import { AdditionalData } from '../../common'
import { EulerAccountBalances } from '../../common/euler'

const ERC20Abi = require('../../../constants/abis/erc20.json')

export class OpynAdaptor implements Adaptor {
  teamToken = undefined

  img = require('../../../imgs/protocol-icons/opyn.png')

  url = 'https://opyn.co/'

  // todo: update to fetch from contracts
  normFactor = 0.53

  async getPositionsByUnderlying(
    account: string,
    underlying: UnderlyingAsset,
    additionalData: AdditionalData,
  ): Promise<Position[]> {
    const vaults = (await querySubgraph(subgraph, getSqueethVaultsQuery(account)))['vaults'] as SqueethVault[]

    const eulerPosition = this.eulerBalanceToPosition(additionalData.euler)

    const shorts = vaults
      .map(p => this.vaultToShort(p))
      .filter(p => p.amount.gt(0))
      .filter(p => p.underlying.asset === underlying)

    const longPositions = await this.getLongs(account)

    return shorts.concat(longPositions).concat(eulerPosition)
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
    return undefined
    // const [marketId, positionId] = subgraphPositionId.split('-')
    // const marketPath = marketIdToPath(marketId)
    // return `https://avalon.app.lyra.finance/position/${marketPath}/${positionId}`
  }

  async getLongs(account: string): Promise<Position[]> {
    const web3 = new Web3(networkToProvider[SupportedNetworks.Mainnet])
    const contract = new web3.eth.Contract(ERC20Abi, wSqueethAddress)
    const rawBalance = await contract.methods.balanceOf(account).call()

    return [
      {
        id: `long-squeeth`,
        chainId: SupportedNetworks.Mainnet,
        protocol: Protocols.Opyn,
        strikePrice: new BigNumber(0),
        expiry: 0,
        type: OptionType.PowerPerp,
        direction: Direction.Long,
        amount: toTokenAmount(rawBalance, 18),
        strike: USDC,
        underlying: ETH,
        collateral: undefined,
        collateralAmount: new BigNumber(0),
        additionalData: this.normFactor,
      },
    ]
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

  eulerBalanceToPosition(eulerAccountData: EulerAccountBalances[]): Position[] {
    return eulerAccountData
      .map(eulerAccount => {
        const eulerPosition = eulerAccount.balances.find(b => b.asset.id === wSqueethAddress)

        // no euler position with squeeth
        if (!eulerPosition) return undefined

        if (eulerPosition.amount.gt(0)) {
          // return long position with no collateral
          return {
            id: `euler-${eulerAccount.account}`,
            chainId: SupportedNetworks.Mainnet,
            protocol: Protocols.Opyn,
            strikePrice: new BigNumber(0),
            expiry: 0,
            type: OptionType.PowerPerp,
            direction: Direction.Long,
            amount: toTokenAmount(eulerPosition.amount, 18),
            strike: USDC,
            underlying: ETH,
            collateral: ETH,
            // collateral: findTokenByAddress(lyraPosition.isBaseCollateral ? lyraPosition.market.baseAddress : lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
            collateralAmount: new BigNumber(0),
            additionalData: this.normFactor,
          }
        }

        // it is the short position,
        // try to find collateral asset this sub-account
        const collaterals = eulerAccount.balances
          .filter(b => b.asset.id !== wSqueethAddress)
          .filter(b => b.amount.gt(0))

        let collateralToUse: undefined | Token = undefined
        let collateralAmount = new BigNumber(0)
        for (const collateral of collaterals) {
          for (const token of allTokens) {
            if (Object.values(token.addresses).includes(collateral.asset.id)) {
              collateralToUse = token
              collateralAmount = new BigNumber(collateral.amount)
              break
            }
          }
        }

        return {
          id: `euler-${eulerAccount.account}`,
          chainId: SupportedNetworks.Mainnet,
          protocol: Protocols.Opyn,
          strikePrice: new BigNumber(0),
          expiry: 0,
          type: OptionType.PowerPerp,
          direction: Direction.Short,
          amount: toTokenAmount(eulerPosition.amount, 18).abs(),
          strike: USDC,
          underlying: ETH,
          collateral: collateralToUse,
          // collateral: findTokenByAddress(lyraPosition.isBaseCollateral ? lyraPosition.market.baseAddress : lyraPosition.market.quoteAddress, SupportedNetworks.Optimism),
          collateralAmount: collateralAmount,
          additionalData: this.normFactor,
        }
      })
      .filter(p => p !== undefined)
  }
}

export default OpynAdaptor
