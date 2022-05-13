import { ribbon } from '../../../constants/teamTokens'
import { Adaptor } from '../../interface'

export class RibbonAdaptor implements Adaptor {
  teamToken = ribbon

  img = require('../../../imgs/protocol-icons/ribbon.svg')

  url = 'https://www.ribbon.finance/'

  async getPositionsByUnderlying(account: string, underlying) {
    return []
  }

  async getUserNonERC20Tokens(account: string) {
    return []
  }

  getLinkToPosition(positionId: string): undefined | string {
    return undefined
  }
}

export default RibbonAdaptor
