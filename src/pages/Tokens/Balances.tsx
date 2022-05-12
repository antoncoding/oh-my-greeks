import React, { useCallback, useState } from 'react'
import { DataView } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'

import { TOKEN_BALANCE } from '../../constants/dataviewContents'

import { secondary } from '../../components/StyleDiv'
import { UserTeamTokenBalance } from '../../types'
import { networkToLogo } from '../../constants'
import { toTokenAmount } from '../../utils/math'
import { useTeamTokenBalances } from '../../hooks/useTeamTokensBalances'

export default function TokenTable({ account }: { account: string }) {
  const [page, setPage] = useState(0)

  const { balances: teamTokenBalances, isLoading: isLoadingBalance } = useTeamTokenBalances(account)

  const renderBalanceRow = useCallback((balanceInfo: UserTeamTokenBalance) => {
    return [
      <img src={balanceInfo.token.img} alt={balanceInfo.protocol} height={30} />,
      toTokenAmount(balanceInfo.balance, balanceInfo.token.decimals).toFixed(4),
      secondary(0),
      <img src={networkToLogo[balanceInfo.networkId]} alt={balanceInfo.protocol} height={30} />,
    ]
  }, [])

  return (
    <>
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        heading={<SectionTitle title={'My Bag'} />}
        fields={['token', 'amount', 'value', 'chain']}
        emptyState={TOKEN_BALANCE}
        entries={teamTokenBalances}
        renderEntry={renderBalanceRow}
        entriesPerPage={10}
        page={page}
        onPageChange={setPage}
      />
    </>
  )
}
