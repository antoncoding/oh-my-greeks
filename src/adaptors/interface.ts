import { UnderlyingAsset } from '../constants'
import { Position } from '../types'

export interface Adaptor {
  getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]>
}

export class EmptyAdaptor implements Adaptor {
  async getPositionsByUnderlying(account: string, underlying: UnderlyingAsset) {
    return []
  }
}
