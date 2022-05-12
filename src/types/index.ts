import BigNumber from 'bignumber.js'
import { Protocols, OptionType, Direction, SupportedNetworks, UnderlyingAsset } from '../constants'

export type ERC20 = {
  name?: string
  symbol: string
  decimals: number
  img?: string
  addresses: { [key in SupportedNetworks]?: string }
}

// token entity, used to represent underlying, strike, collateral... etc
export type Token = ERC20 & {
  asset: UnderlyingAsset // what is this token representing? use to link multiple ERC20s to the same asset (sETH, wETH) ...etc
}

// option or power perp position
export type Position = {
  id: string // unique id for the protocol to parse particular position
  protocol: Protocols
  strikePrice: BigNumber
  expiry: number
  type: OptionType // call or put or power perp
  direction: Direction // long or short
  amount: BigNumber
  underlying: Token
  strike: Token
  collateral?: Token
  chainId: SupportedNetworks
  collateralAmount: BigNumber
}

// represent one user's position on the team token
export type UserTeamTokenBalance = {
  protocol: Protocols
  token: ERC20
  balance: BigNumber
  isLocked: boolean
  networkId: SupportedNetworks
}
