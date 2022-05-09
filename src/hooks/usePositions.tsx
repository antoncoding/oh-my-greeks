import { useEffect, useState } from 'react'
import { useConnectedWallet } from '../contexts/wallet'
import { Position } from '../types'
import { getAllPositions } from '../utils/getPositions'

export function usePositions(address: string) {
  const { networkId } = useConnectedWallet()

  const [isLoading, setIsLoading] = useState(true)
  const [positions, setAllPositions] = useState<Position[]>([])

  useEffect(() => {
    async function resolveENS() {
      if (address) {
        const pos = await getAllPositions(address)
        setAllPositions(pos)
        setIsLoading(false)
      }
    }
    resolveENS()
  }, [address, networkId])

  return { positions, isLoading }
}
