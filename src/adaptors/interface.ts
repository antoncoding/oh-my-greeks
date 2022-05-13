import BigNumber from 'bignumber.js'
import { SupportedNetworks, UnderlyingAsset } from '../constants'
import { TeamToken, Position } from '../types'

export interface Adaptor {
  // fetch user balance of your team token.
  teamToken: TeamToken | undefined

  // return the path to logo.
  img?: string

  // link to the home page of your app
  url: string

  // get list of "positions"
  getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]>

  // return list of staked or locked tokens a user has
  getUserNonERC20Tokens(
    account: string,
  ): Promise<{ token: TeamToken; balance: BigNumber; networkId: SupportedNetworks }[]>

  getLinkToPosition(positionId: string): undefined | string
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
  ): Promise<{ token: TeamToken; balance: BigNumber; networkId: SupportedNetworks }[]> {
    return []
  }

  getLinkToPosition(positionId: string): undefined | string {
    return undefined
  }
}
