import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, Split } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TypeTag from '../../components/ActionBadge'

import { usePositions } from '../../hooks/usePositions'

import { useConnectedWallet } from '../../contexts/wallet'
import { showExpiryText, sortByExpiryThanStrike } from '../../utils/others'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary, green, red } from '../../components/StyleDiv'
import { useTokenPrice } from '../../hooks'
import { Position } from '../../types'
import { Direction, getWeth, SupportedNetworks } from '../../constants'
import { getPositionGreeks, toTokenAmount } from '../../utils/math'

export default function Positions({ account }: { account: string }) {
  const { user } = useConnectedWallet()
  console.log(`connected user`, user)
  const [page, setPage] = useState(0)

  // temporary
  const ethPrice = useTokenPrice(getWeth(SupportedNetworks.Mainnet).id, 10)

  const { positions, isLoading: isLoadingBalance } = usePositions(account)

  const positionWithGreeks = useMemo(() => {
    return positions.map(position => {
      // todo: fix vol
      const vol = 0.9
      const greeks = getPositionGreeks(ethPrice, position.strikePrice, position.expiry, vol, position.type)
      return {
        ...position,
        ...greeks,
      }
    })
  }, [positions, ethPrice])

  const aggregatedGreeks = useMemo(() => {
    return positionWithGreeks.reduce(
      (prev, curr) => {
        return {
          delta: prev.delta + curr.amount.times(curr.delta).toNumber(),
          gamma: prev.gamma + curr.amount.times(curr.gamma).toNumber(),
          theta: prev.theta + curr.amount.times(curr.theta).toNumber(),
          vega: prev.vega + curr.amount.times(curr.vega).toNumber(),
          rho: prev.rho + curr.amount.times(curr.rho).toNumber(),
        }
      },
      { delta: 0, gamma: 0, vega: 0, theta: 0, rho: 0 },
    )
  }, [positionWithGreeks])

  const renderPositionRow = useCallback(
    (position: Position & { delta: number; gamma: number; vega: number; theta: number }) => {
      const sign = position.direction === Direction.Long ? 1 : -1
      return [
        DirectionBlock(position.direction),
        <TypeTag type={position.type} />,
        secondary(`${position.strikePrice.integerValue().toString()}`),
        Size(position.amount, position.direction),
        secondary(showExpiryText(position.expiry)),
        GreekBlock(position.amount.times(position.delta).times(sign).toFixed(5)), // delta
        GreekBlock(position.amount.times(position.gamma).times(sign).toFixed(5)), // gamma
        GreekBlock(position.amount.times(position.vega).times(sign).toFixed(5)),
        GreekBlock(position.amount.times(position.theta).times(sign).toFixed(5)),
        position.collateralAmount.gt(0)
          ? secondary(
              `${toTokenAmount(position.collateralAmount, position.collateral.decimals)} ${position.collateral.symbol}`,
            )
          : '-',
        position.protocol,
      ]
    },
    [],
  )

  return (
    <>
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        heading={
          <Split
            primary={<SectionTitle title="ETH Options" />}
            secondary={<div style={{ paddingTop: 30 }}> Price ${ethPrice.toString()} </div>}
          />
        }
        fields={[
          'direction',
          'type',
          'strike',
          'size',
          'expiry',
          'delta',
          'gamma',
          'vega',
          'theta',
          'collateral',
          'platform',
        ]}
        emptyState={POSITIONS}
        entries={positionWithGreeks.sort((a, b) => sortByExpiryThanStrike(a, b)) || []}
        renderEntry={renderPositionRow}
        entriesPerPage={5}
        page={page}
        onPageChange={setPage}
      />
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        fields={['delta', 'gamma', 'vega', 'theta', 'rho', 'collateral']}
        emptyState={POSITIONS}
        entries={[aggregatedGreeks]}
        renderEntry={data => {
          return [
            data.delta.toFixed(5),
            data.gamma.toFixed(5),
            data.vega.toFixed(5),
            data.theta.toFixed(5),
            data.rho.toFixed(5),
          ]
        }}
      />
    </>
  )
}

function Size(payout: BigNumber, direction: Direction): JSX.Element {
  const text = direction === Direction.Long ? green(payout.toFixed(2)) : red(payout.toFixed(2))
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {text} </div>
}

function DirectionBlock(direction: Direction): JSX.Element {
  const text = direction === Direction.Long ? green(direction) : red(direction)
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {text} </div>
}

function GreekBlock(text: any): JSX.Element {
  return <div style={{ fontSize: 15 }}> {text} </div>
}
