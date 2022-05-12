import BigNumber from 'bignumber.js'
import { SupportedNetworks, UnderlyingAsset } from '../constants'
import { ERC20, Position } from '../types'

export interface Adaptor {
  // fetch user balance of your team token.
  teamToken: ERC20 | undefined

  // return the path to logo.
  img?: string

  // link to the home page of your app
  url: string

  // get list of "positions"
  getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]>

  // return list of staked or locked tokens a user has
  getUserNonERC20Tokens(account: string): Promise<{ token: ERC20; balance: BigNumber; networkId: SupportedNetworks }[]>
}

export class EmptyAdaptor implements Adaptor {
  teamToken = undefined

  img = require('../imgs/protocol-icons/opyn.png')

  url = ''

  async getPositionsByUnderlying(account: string, underlying: UnderlyingAsset) {
    return []
  }

  async getUserNonERC20Tokens(
    account: string,
  ): Promise<{ token: ERC20; balance: BigNumber; networkId: SupportedNetworks }[]> {
    return []
  }
}
