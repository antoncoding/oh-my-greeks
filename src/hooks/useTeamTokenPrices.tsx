import { useEffect, useState } from 'react'
import { protocolToAdaptor } from '../adaptors/index'
import { Protocols } from '../constants'

export function useTeamTokenPricesData() {
  const [isLoading, setIsLoading] = useState(true)
  const [priceData, setAllPrices] = useState<CoinGeckoReturnStruct[]>([])

  useEffect(() => {
    async function updateBalance() {
      const priceData = await getTokenPriceCoingecko()
      setAllPrices(priceData)
      setIsLoading(false)
    }
    updateBalance()
  }, [])

  return { priceData, isLoading }
}

type CoinGeckoReturnStruct = {
  id: string
  current_price: number
  price_change_percentage_1h_in_currency: number
  price_change_percentage_24h_in_currency: number
  price_change_percentage_7d_in_currency: number
}

export const getTokenPriceCoingecko = async (): Promise<CoinGeckoReturnStruct[]> => {
  const allIds = Object.values(Protocols)
    .map(protocol => protocolToAdaptor(protocol).teamToken.coingeckoId)
    .join(',')
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${allIds}&price_change_percentage=1h%2C24h%2C7d&sparkline=false`
  const res = await fetch(url)
  const data: CoinGeckoReturnStruct[] = await res.json()
  return data
}
