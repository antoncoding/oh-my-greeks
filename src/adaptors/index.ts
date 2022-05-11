import { isMainnet, Protocols, SHOW_TESTNET, UnderlyingAsset } from '../constants'
import { Position } from '../types'

import PremiaAdaptor from './protocols/premia'
import LyraAdaptor from './protocols/lyra'

import { Adaptor, EmptyAdaptor } from './interface'
import { getPreference } from '../utils/storage'

function protocolToAdaptor(protocol: Protocols): Adaptor {
  if (protocol === Protocols.Lyra) return new LyraAdaptor()
  if (protocol === Protocols.Premia) return new PremiaAdaptor()
  return new EmptyAdaptor()
}

export async function getAllPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
  const showTestnet = getPreference(SHOW_TESTNET, 'true') === 'true'

  let result: Position[] = []
  for (const protocol of Object.values(Protocols)) {
    const positions = await protocolToAdaptor(protocol).getPositionsByUnderlying(account, underlying)
    result = result.concat(positions)
  }
  return result.filter(position => {
    return showTestnet || isMainnet[position.chainId]
  })
}
