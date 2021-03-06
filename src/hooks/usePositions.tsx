import { useEffect, useState } from 'react'
import { UnderlyingAsset } from '../constants'
import { useConnectedWallet } from '../contexts/wallet'
import { Position } from '../types'
import { getAllPositionsByUnderlying } from '../adaptors/index'

export function usePositions(address: string, underlying: UnderlyingAsset) {
  const { networkId } = useConnectedWallet()

  const [isLoading, setIsLoading] = useState(true)
  const [positions, setAllPositions] = useState<Position[]>([])

  useEffect(() => {
    async function resolveENS() {
      if (address) {
        const pos = await getAllPositionsByUnderlying(address, underlying)
        setAllPositions(pos)
        setIsLoading(false)
      }
    }
    resolveENS()
  }, [address, networkId, underlying])

  return { positions, isLoading }
}
