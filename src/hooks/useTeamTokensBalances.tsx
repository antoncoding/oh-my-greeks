import { useEffect, useState } from 'react'
import { UserTeamTokenBalance } from '../types'
import { getTeamTokenBalances } from '../adaptors/index'

export function useTeamTokenBalances(address: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [balances, setBalances] = useState<UserTeamTokenBalance[]>([])

  useEffect(() => {
    async function updateBalance() {
      if (address) {
        const balances = await getTeamTokenBalances(address)
        setBalances(balances)
        setIsLoading(false)
      }
    }
    updateBalance()
  }, [address])

  return { balances, isLoading }
}
