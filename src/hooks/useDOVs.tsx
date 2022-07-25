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
    console.log('h')
    async function fetchVaults() {
      console.log('fetch')
      if (address) {
        console.log(address, address)
        const pos = await getAllDOVsByUnderlying(address, underlying)
        setAllDovs(pos)
        setIsLoading(false)
      } else {
        console.log('no addr')
      }
    }
    fetchVaults()
  }, [address, networkId, underlying])

  return { dovs, isLoading }
}
