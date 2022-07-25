import { useEffect, useState } from 'react'
import { UnderlyingAsset } from '../constants'
import { useConnectedWallet } from '../contexts/wallet'
import { DovPosition } from '../types'
import { getAllDOVsByUnderlying } from '../adaptors/index'

export function useDOVs(address: string, underlying: UnderlyingAsset) {
  const { networkId } = useConnectedWallet()

  const [isLoading, setIsLoading] = useState(true)
  const [dovs, setAllDovs] = useState<DovPosition[]>([])

  // console.log('dovs', dovs)

  useEffect(() => {
    async function fetchVaults() {
      if (address) {
        const pos = await getAllDOVsByUnderlying(address, underlying)
        setAllDovs(pos)
        setIsLoading(false)
      }
    }
    fetchVaults()
  }, [address, networkId, underlying])

  return { dovs, isLoading }
}
