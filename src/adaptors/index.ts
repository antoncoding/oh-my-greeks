import {
  DUST_AMOUNT,
  isMainnet,
  networkToProvider,
  Protocols,
  SHOW_TESTNET,
  SupportedNetworks,
  UnderlyingAsset,
} from '../constants'
import { DovPosition, Position, UserTeamTokenBalance } from '../types'

import PremiaAdaptor from './protocols/premia'
import LyraAdaptor from './protocols/lyra'

import { Adaptor, EmptyAdaptor } from './interface'
import { getPreference } from '../utils/storage'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import RibbonAdaptor from './protocols/ribbon'
import OpynAdaptor from './protocols/opyn'
import { getAdditionalData } from './common'

const ERC20Abi = require('../constants/abis/erc20.json')

export function protocolToAdaptor(protocol: Protocols): Adaptor {
  if (protocol === Protocols.Lyra) return new LyraAdaptor()
  if (protocol === Protocols.Premia) return new PremiaAdaptor()
  if (protocol === Protocols.Ribbon) return new RibbonAdaptor()
  if (protocol === Protocols.Opyn) return new OpynAdaptor()
  return new EmptyAdaptor()
}

/**
 * Get all positions. Filtered by underlying
 * @param account
 * @param underlying
 * @returns
 */
export async function getAllPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
  // get commonly used data. (for now, euler positions)
  const additionalData = await getAdditionalData(account)

  // iterate through all protocols and find get positions
  let result: Position[] = []
  for (const protocol of Object.values(Protocols)) {
    try {
      const positions = await protocolToAdaptor(protocol).getPositionsByUnderlying(account, underlying, additionalData)
      result = result.concat(positions)
    } catch (error) {
      console.log(`error`, error)
      console.log(`Fetching ${protocol} position error`)
    }
  }

  const showTestnet = getPreference(SHOW_TESTNET, 'true') === 'true'
  return result
    .filter(position => showTestnet || isMainnet[position.chainId])
    .filter(position => position.amount.gte(Number(getPreference(DUST_AMOUNT, '0.01'))))
}

/**
 * Get all DOV share positions. Filtered by underlying
 * @param account
 * @param underlying
 * @returns
 */
export async function getAllDOVsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<DovPosition[]> {
  // get commonly used data. (for now, euler positions)
  const additionalData = await getAdditionalData(account)

  // iterate through all protocols and find get positions
  let result: DovPosition[] = []
  for (const protocol of Object.values(Protocols)) {
    try {
      const positions = await protocolToAdaptor(protocol).getDovPositionsByUnderlying(
        account,
        underlying,
        additionalData,
      )
      result = result.concat(positions)
    } catch (error) {
      console.log(`error`, error)
      console.log(`Fetching ${protocol} position error`)
    }
  }

  const showTestnet = getPreference(SHOW_TESTNET, 'true') === 'true'
  return result
    .filter(position => showTestnet || isMainnet[position.chainId])
    .filter(
      position => position.positions.filter(p => p.amount.gte(Number(getPreference(DUST_AMOUNT, '0.01')))).length > 0,
    )
}

/**
 *
 */
export async function getTeamTokenBalances(account: string): Promise<UserTeamTokenBalance[]> {
  let result: UserTeamTokenBalance[] = []

  // process additional data
  const { euler } = await getAdditionalData(account)

  for (const protocol of Object.values(Protocols)) {
    // get erc20 balance
    const token = protocolToAdaptor(protocol).teamToken
    if (!token) continue

    // check account token balance
    for (const network of Object.keys(token.addresses)) {
      const web3 = new Web3(networkToProvider[network])
      const contract = new web3.eth.Contract(ERC20Abi, token.addresses[network])
      const rawBalance = await contract.methods.balanceOf(account).call()
      const balance = new BigNumber(rawBalance)
      if (balance.gt(0))
        result.push({
          protocol: protocol,
          balance,
          token,
          networkId: network as unknown as SupportedNetworks,
          isLocked: false,
        })
    }

    // if user's euler sub-accounts
    let eulerBalance = new BigNumber(0)
    for (const subaccount of euler) {
      for (const balance of subaccount.balances) {
        const isProjectToken = Object.values(token.addresses).includes(balance.asset.id)
        if (isProjectToken) eulerBalance = eulerBalance.plus(balance.amount)
      }
    }
    if (eulerBalance.gt(0)) {
      result.push({
        protocol: protocol,
        balance: eulerBalance,
        token,
        networkId: SupportedNetworks.Mainnet,
        isLocked: false,
        additionalIcons: [require('../imgs/protocol-icons/euler.svg')],
      })
    }
    // todo: what to do when balance is negative?
  }
  return result
}
