import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, Info, LinkBase } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TypeTag from '../../components/ActionBadge'

import { usePositions } from '../../hooks/usePositions'

import { showExpiryText, sortByExpiryThanStrike } from '../../utils/others'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary, green, red } from '../../components/StyleDiv'
import { Position } from '../../types'
import { Direction, networkToLogo, UnderlyingAsset } from '../../constants'
import { getPositionGreeks, toTokenAmount } from '../../utils/math'
import { protocolToAdaptor } from '../../adaptors'

export default function Positions({
  account,
  underlying,
  spotPrice,
  vol,
}: {
  account: string
  underlying: UnderlyingAsset
  spotPrice: BigNumber
  vol: number
}) {
  const [page, setPage] = useState(0)

  const { positions, isLoading: isLoadingBalance } = usePositions(account, underlying)

  const positionWithGreeks = useMemo(() => {
    return positions.map(position => {
      // todo: use implied vol for each strike?
      const greeks = getPositionGreeks(spotPrice, position.strikePrice, position.expiry, vol / 100, position.type)

      const collateralIsUnderlying = position.collateral && position.collateral.asset === underlying
      const collateralDelta = collateralIsUnderlying
        ? toTokenAmount(position.collateralAmount, position.collateral.decimals).toNumber()
        : 0

      const sign = position.direction === Direction.Long ? 1 : -1

      return {
        ...position,
        ...greeks,
        sign,
        collateralDelta,
      }
    })
  }, [positions, spotPrice, vol, underlying])

  const aggregatedGreeks = useMemo(() => {
    return positionWithGreeks.reduce(
      (prev, curr) => {
        return {
          delta: prev.delta + curr.amount.times(curr.delta).times(curr.sign).toNumber() + curr.collateralDelta,
          gamma: prev.gamma + curr.amount.times(curr.gamma).times(curr.sign).toNumber(),
          theta: prev.theta + curr.amount.times(curr.theta).times(curr.sign).toNumber(),
          vega: prev.vega + curr.amount.times(curr.vega).times(curr.sign).toNumber(),
          rho: prev.rho + curr.amount.times(curr.rho).times(curr.sign).toNumber(),
        }
      },
      { delta: 0, gamma: 0, vega: 0, theta: 0, rho: 0 },
    )
  }, [positionWithGreeks])

  const renderPositionRow = useCallback(
    (
      p: Position & {
        delta: number
        gamma: number
        vega: number
        theta: number
        sign: number
        collateralDelta: number
      },
    ) => {
      const adaptor = protocolToAdaptor(p.protocol)
      const positionLink = adaptor.getLinkToPosition(p.id)
      return [
        DirectionBlock(p.direction),
        <TypeTag type={p.type} />,
        secondary(`${p.strikePrice.integerValue().toString()}`),
        secondary(showExpiryText(p.expiry)),
        Size(p.amount, p.direction),
        GreekBlock(p.amount.times(p.delta).times(p.sign).plus(p.collateralDelta).toFixed(4)), // delta
        GreekBlock(p.amount.times(p.gamma).times(p.sign).toFixed(5)), // gamma
        GreekBlock(p.amount.times(p.vega).times(p.sign).toFixed(4)),
        GreekBlock(p.amount.times(p.theta).times(p.sign).toFixed(4)),
        p.collateral && p.collateralAmount.gt(0)
          ? secondary(
              `${toTokenAmount(p.collateralAmount, p.collateral.decimals).decimalPlaces(2).toNumber()} ${
                p.collateral.symbol
              }`,
            )
          : '-',
        <LinkBase
          onClick={
            positionLink
              ? () => {
                  window.open(positionLink, '_blank')
                }
              : null
          }
        >
          <img src={adaptor.img} height={25} alt={p.protocol} />
          <img src={networkToLogo[p.chainId]} height={25} alt={p.protocol} />
        </LinkBase>,
      ]
    },
    [],
  )

  return (
    <>
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        heading={<SectionTitle title={`${underlying} Options`} />}
        fields={[
          'direction',
          'type',
          'strike',
          'expiry',
          'size',
          'delta',
          'gamma',
          'vega',
          'theta',
          'collateral',
          'protocol',
        ]}
        tableRowHeight={45}
        emptyState={POSITIONS}
        entries={positionWithGreeks.sort((a, b) => sortByExpiryThanStrike(a, b)) || []}
        renderEntry={renderPositionRow}
        entriesPerPage={10}
        page={page}
        onPageChange={setPage}
      />
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        fields={['delta', 'gamma', 'vega', 'theta', 'rho']}
        emptyState={POSITIONS}
        entries={[aggregatedGreeks]}
        tableRowHeight={47}
        renderEntry={data => {
          return [
            data.delta.toFixed(4),
            data.gamma.toFixed(5),
            data.vega.toFixed(4),
            data.theta.toFixed(4),
            data.rho.toFixed(4),
          ]
        }}
      />
      <br />
      <Info mode="info" title="Beta version">
        <div> * You can enable / disable Lyra Avalon tests positions in settings.</div>
        <div> * Premia short positions are not parsed. </div>
      </Info>
      <Info mode="warning" title="Beta version">
        All greeks are calculated with ATM vol {vol}%
      </Info>
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
