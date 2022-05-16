import { isMainnet, networkToProvider, Protocols, SHOW_TESTNET, SupportedNetworks, UnderlyingAsset } from '../constants'
import { Position, UserTeamTokenBalance } from '../types'

import PremiaAdaptor from './protocols/premia'
import LyraAdaptor from './protocols/lyra'

import { Adaptor, EmptyAdaptor } from './interface'
import { getPreference } from '../utils/storage'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import RibbonAdaptor from './protocols/ribbon'
import OpynAdaptor from './protocols/opyn'

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
  const showTestnet = getPreference(SHOW_TESTNET, 'true') === 'true'

  let result: Position[] = []
  for (const protocol of Object.values(Protocols)) {
    const positions = await protocolToAdaptor(protocol).getPositionsByUnderlying(account, underlying)
    result = result.concat(positions)
  }
  return result
    .filter(position => {
      return showTestnet || isMainnet[position.chainId]
    })
    .filter(position => position.amount.gt(0.001))
}

/**
 *
 */
export async function getTeamTokenBalances(account: string): Promise<UserTeamTokenBalance[]> {
  let result: UserTeamTokenBalance[] = []
  for (const protocol of Object.values(Protocols)) {
    // get erc20 balance
    const token = protocolToAdaptor(protocol).teamToken
    if (!token) continue

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

    // todo: get non-erc20s (staked or locked tokens)
  }
  return result
}
