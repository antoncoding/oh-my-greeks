import BigNumber from 'bignumber.js'
import { Protocols, OptionType, Direction, SupportedNetworks, UnderlyingAsset } from '../constants'

// token entity
export type Token = {
  name?: string
  symbol: string
  decimals: number
  asset: UnderlyingAsset // what is this token representing? use to link multiple ERC20s to the same asset (sETH, wETH) ,,etc
  img?: string
  addresses: { [key in SupportedNetworks]?: string }
}

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
