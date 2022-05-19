import React, { useCallback, useState, useMemo } from 'react'
import { DataView, Distribution, Split, Box } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'

import { TOKEN_BALANCE } from '../../constants/dataviewContents'

import { green, red, secondary } from '../../components/StyleDiv'
import { networkToLogo } from '../../constants'
import { toTokenAmount } from '../../utils/math'
import { useTeamTokenBalances } from '../../hooks/useTeamTokensBalances'
import { useTeamTokenPricesData } from '../../hooks/useTeamTokenPrices'
import BigNumber from 'bignumber.js'

export default function TokenTable({ account }: { account: string }) {
  const [page, setPage] = useState(0)

  const { balances: teamTokenBalances, isLoading: isLoadingBalance } = useTeamTokenBalances(account)

  const { priceData } = useTeamTokenPricesData()

  const balanceData = useMemo(() => {
    return teamTokenBalances
      .map(balanceInfo => {
        const balance = toTokenAmount(balanceInfo.balance, balanceInfo.token.decimals)
        const entry = priceData.find(p => p.id === balanceInfo.token.coingeckoId)
        const price = entry.current_price
        const value = balance.multipliedBy(price)
        const percentageChangeDay = entry.price_change_percentage_24h_in_currency
        const percentageChangeWeek = entry.price_change_percentage_7d_in_currency
        return {
          balance,
          price,
          value,
          percentageChangeDay,
          percentageChangeWeek,
          token: balanceInfo.token,
          networkId: balanceInfo.networkId,
          protocol: balanceInfo.protocol,
          additionalIcons: balanceInfo.additionalIcons,
        }
      })
      .sort((a, b) => (a.value.gt(b.value) ? -1 : 1))
  }, [teamTokenBalances, priceData])

  // entry: type of balanceData
  const renderBalanceRow = useCallback(entry => {
    return [
      <img src={entry.token.img} alt={entry.protocol} height={26} />,
      entry.balance.toFixed(4),
      secondary(`$${entry.value.toFixed(2)}`),
      secondary(`$${entry.price.toFixed(4)}`),
      PercentageChangeBlock(entry.percentageChangeDay),
      PercentageChangeBlock(entry.percentageChangeWeek),
      <div>
        {/* block to show network logo and also 'additionalIcons' */}
        {entry.additionalIcons?.map(icon => (
          <img key={icon} src={icon} alt={icon} height={20} />
        ))}
        <img src={networkToLogo[entry.networkId]} alt={entry.protocol} height={26} />
      </div>,
    ]
  }, [])

  const colors = useMemo(() => {
    if (balanceData.length === 0) return ['grey']
    return balanceData.map(b => b.token.themeColor)
  }, [balanceData])

  const tokenPercentages = useMemo(() => {
    if (balanceData.length === 0) return [{ item: 'ngmi', percentage: 100 }]

    let totalValue = new BigNumber(0)
    for (const entry of balanceData) {
      totalValue = totalValue.plus(entry.value)
    }
    return balanceData.map(entry => {
      return {
        item: entry.token.symbol,
        percentage: entry.value.div(totalValue).multipliedBy(100).decimalPlaces(2).toNumber(),
      }
    })
  }, [balanceData])

  return (
    <Split
      primary={
        <DataView
          status={isLoadingBalance ? 'loading' : 'default'}
          heading={<SectionTitle title={'My Bag'} />}
          fields={['token', 'amount', 'value', 'price', '24h', '7d', 'chain']}
          emptyState={TOKEN_BALANCE}
          entries={balanceData}
          renderEntry={renderBalanceRow}
          entriesPerPage={10}
          page={page}
          onPageChange={setPage}
        />
      }
      secondary={
        <Box>
          <Distribution heading={<SectionTitle title={'Distribution'} />} items={tokenPercentages} colors={colors} />
        </Box>
      }
    />
  )
}

function PercentageChangeBlock(change: number): JSX.Element {
  const text = change > 0 ? green(change.toFixed(2) + '%') : red(change.toFixed(2) + '%')
  return <div style={{ paddingRight: '4px', fontSize: 14 }}> {text} </div>
}
