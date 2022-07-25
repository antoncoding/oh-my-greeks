import Web3 from 'web3'
import ENS from 'ethereum-ens'
import {
  isSupportedByMetaMask,
  networkIdToExplorer,
  networkIdToName,
  networkToProvider,
  networkToTokenConfig,
  OptionType,
  SupportedNetworks,
} from '../constants'
import { toTokenAmount } from './math'
import BigNumber from 'bignumber.js'
import { Position, Greeks } from '../types'

// ENS
export const resolveENS = async (ensName: string, networkId: number) => {
  const web3 = new Web3(networkToProvider[networkId])
  const ens = new ENS(web3)
  const address = await ens.resolver(ensName).addr()
  return address.toLowerCase()
}

export const isEOA = async (address: string, networkId: number): Promise<Boolean> => {
  const web3 = new Web3(networkToProvider[networkId])
  return (await web3.eth.getCode(address)) === '0x'
}

type GreeksAndCollateral = Greeks & { collateralDelta?: number }

export const mergeGreeks = (greekArray: GreeksAndCollateral[]): Greeks => {
  return greekArray.reduce(
    (prev, curr) => {
      return {
        delta: prev.delta + curr.delta + curr.collateralDelta || 0,
        gamma: prev.gamma + curr.gamma,
        theta: prev.theta + curr.theta,
        vega: prev.vega + curr.vega,
        rho: prev.rho + curr.rho,
      }
    },
    { delta: 0, gamma: 0, vega: 0, theta: 0, rho: 0 },
  )
}

export const showExpiryText = (expiry: number) => {
  if (expiry === 0) return '-'
  // Wed, 01 Jun 2022 06:00:00 GMT
  const string = new Date(expiry * 1000).toUTCString()
  const pieces = string.split(' ')
  const time = pieces[4]
  pieces[4] = time.slice(0, 5)
  return pieces.join(' ')
}

/**
 * Sorting function
 * @param a
 * @param b
 */
export const sortByExpiryThanStrike = (a: Position, b: Position) => {
  if (Number(a.expiry) > Number(b.expiry)) return 1
  else if (Number(a.expiry) > Number(b.expiry)) return -1
  else if (Number(a.strikePrice) > Number(b.strikePrice)) return 1
  else if (Number(a.amount) > Number(b.amount)) return 1
  else return -1
}

export const isExpired = (position: Position) => {
  return Number(position.expiry) < Date.now() / 1000
}

export const isITM = (position: Position, expiryPrice: string) => {
  return (
    (position.type === OptionType.Put && Number(expiryPrice) < Number(position.strikePrice)) ||
    (position.type === OptionType.Call && Number(expiryPrice) > Number(position.strikePrice))
  )
}

export const getExpiryPayout = (position: Position, amount: string, expiryPrice: string) => {
  if (position.type === OptionType.Put) {
    return BigNumber.max(
      toTokenAmount(new BigNumber(position.strikePrice).minus(new BigNumber(expiryPrice)), 8).times(
        toTokenAmount(amount, 8),
      ),
      0,
    )
  } else {
    return BigNumber.max(
      toTokenAmount(new BigNumber(expiryPrice).minus(position.strikePrice), 8).times(toTokenAmount(amount, 8)),
      0,
    ).div(toTokenAmount(position.strikePrice, 8))
  }
}

export function toUTCDateString(expiry: number): string {
  const expiryDate = new Date(expiry * 1000)
  return expiryDate.toUTCString().split(' ').slice(1, 4).join(' ')
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function switchNetwork(provider: any, networkId: SupportedNetworks): Promise<boolean> {
  if (!provider.request) return false
  if (isSupportedByMetaMask(networkId)) {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: `0x${networkId.toString(16)}`,
        },
      ],
    })
    return true
  } else {
    await provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: `0x${networkId.toString(16)}`,
          chainName: networkIdToName[networkId],
          nativeCurrency: networkToTokenConfig(networkId),
          rpcUrls: [networkToProvider[networkId]],
          blockExplorerUrls: [networkIdToExplorer[networkId]],
        },
      ],
    })
    return true
  }
}
