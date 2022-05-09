import BigNumber from 'bignumber.js'
import { Protocols, OptionType, Direction, SupportedNetworks } from '../constants'

export type Token = {
  id: string
  name?: string
  symbol: string
  decimals: number
}

export type Position = {
  protocol: Protocols
  strikePrice: BigNumber
  expiry: number
  type: OptionType // call or put
  direction: Direction // long or short
  amount: BigNumber
  underlying: Token
  strike: Token
  collateral: Token
  chainId: SupportedNetworks
  collateralAmount: BigNumber
}

export type Product = {
  collateral: Token
  stike: Token
  underlying: Token
  isPut: Token
}

export enum ActionType {
  OpenVault,
  MintShortOption,
  BurnShortOption,
  DepositLongOption,
  WithdrawLongOption,
  DepositCollateral,
  WithdrawCollateral,
  SettleVault,
  Redeem,
  Call,
  Liquidate,
  InvalidAction,
}

export type actionArg = {
  actionType: ActionType
  owner: string
  secondAddress: string
  asset: string
  vaultId: string
  amount: string
  index: string
  data: string
}

export type ChainlinkRound = {
  number: string
  unixTimestamp: number
  value: string
  roundIdHex: string
}
