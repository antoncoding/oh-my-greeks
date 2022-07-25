import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, Info, LinkBase } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TypeTag from '../../components/ActionBadge'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary, green, red } from '../../components/StyleDiv'
import { DovPosition } from '../../types'
import { Direction, DUST_AMOUNT, networkToLogo, UnderlyingAsset } from '../../constants'
import { getWeightedPositionGreeks, toTokenAmount } from '../../utils/math'
import { protocolToAdaptor } from '../../adaptors'
import { getPreference } from '../../utils/storage'
import { useDOVs } from '../../hooks/useDOVs'

const digits = getPreference(DUST_AMOUNT, '0.01').split('.')[1].length

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

  const { dovs, isLoading: isLoadingBalance } = useDOVs(account, underlying)

  const dovWithGreeks = useMemo(() => {
    return dovs.map(dov => {
      let aggGreeks = {
        delta: 0,
        gamma: 0,
        theta: 0,
        vega: 0,
        rho: 0,
      }
      let posGreeks = []
      // todo: use implied vol for each strike?
      for (let position of dov.positions) {
        const greeks = getWeightedPositionGreeks(
          spotPrice,
          position.strikePrice,
          position.expiry,
          vol / 100,
          position.type,
          position.amount,
          position.direction,
          dov.additionalData,
        )
        posGreeks.push(greeks)
        aggGreeks = {
          delta: aggGreeks.delta + greeks.delta,
          gamma: aggGreeks.gamma + greeks.gamma,
          theta: aggGreeks.theta + greeks.theta,
          vega: aggGreeks.vega + greeks.vega,
          rho: aggGreeks.rho + greeks.rho,
        }
      }

      const collateralIsUnderlying = dov.collateral && dov.collateral.asset === underlying
      const collateralDelta = collateralIsUnderlying
        ? toTokenAmount(dov.collateralAmount, dov.collateral.decimals).toNumber()
        : 0

      const sign = dov.positions[0].direction === Direction.Long ? 1 : -1

      return {
        ...dov,
        posGreeks,
        aggGreeks,
        sign,
        collateralDelta,
      }
    })
  }, [dovs, spotPrice, vol, underlying])

  const totalGreeks = useMemo(() => {
    return dovWithGreeks.reduce(
      (prev, curr) => {
        return {
          delta: prev.delta + curr.aggGreeks.delta + curr.collateralDelta,
          gamma: prev.gamma + curr.aggGreeks.gamma,
          theta: prev.theta + curr.aggGreeks.theta,
          vega: prev.vega + curr.aggGreeks.vega,
          rho: prev.rho + curr.aggGreeks.rho,
        }
      },
      { delta: 0, gamma: 0, vega: 0, theta: 0, rho: 0 },
    )
  }, [dovWithGreeks])

  const renderPositionRow = useCallback(
    (
      p: DovPosition & {
        aggGreeks: {
          delta: number
          gamma: number
          vega: number
          theta: number
          rho: number
          collateralDelta: number
        }
        posGreeks: {
          delta: number
          gamma: number
          vega: number
          theta: number
          rho: number
          collateralDelta: number
        }[]
      },
    ) => {
      const adaptor = protocolToAdaptor(p.protocol)
      const positionLink = adaptor.getLinkToPosition(p.id)
      return [
        DirectionBlock(p.aggGreeks.delta > 0 ? Direction.Long : Direction.Short),
        p.name,
        // <TypeTag type={p.type} />,
        // secondary(p.strikePrice.isZero() ? '-' : `${p.strikePrice.integerValue().toString()}`),
        // secondary(showExpiryText(p.expiry)),
        Size(p.balance, p.aggGreeks.delta > 0 ? Direction.Long : Direction.Short),
        GreekBlock(p.aggGreeks.delta.toFixed(4)), // delta
        GreekBlock(p.aggGreeks.gamma.toFixed(5)), // gamma
        GreekBlock(p.aggGreeks.vega.toFixed(4)),
        GreekBlock(p.aggGreeks.rho.toFixed(4)),
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

          {/* temp: add euler icon if its a euler position */}
          {p.id.includes('euler') && (
            <img src={require('../../imgs/protocol-icons/euler.svg')} height={25} alt={p.protocol} />
          )}

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
        heading={<SectionTitle title={`${underlying} Vaults`} />}
        fields={[
          'direction',
          'Name',
          // 'strike',
          // 'expiry',
          'balance',
          'delta',
          'gamma',
          'vega',
          'theta',
          'collateral',
          'protocol',
        ]}
        tableRowHeight={45}
        emptyState={POSITIONS}
        entries={
          dovWithGreeks
          // .sort((a, b) => sortByExpiryThanStrike(a, b)) || []
        }
        renderEntry={renderPositionRow}
        entriesPerPage={10}
        page={page}
        onPageChange={setPage}
      />
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        fields={['delta', 'gamma', 'vega', 'theta', 'rho']}
        emptyState={POSITIONS}
        entries={[totalGreeks]}
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
        All greeks are calculated with ATM vol {vol}%
      </Info>
    </>
  )
}

function Size(payout: BigNumber, direction: Direction): JSX.Element {
  const text = direction === Direction.Long ? green(payout.toFormat(digits)) : red(payout.toFormat(digits))
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {text} </div>
}

function DirectionBlock(direction: Direction): JSX.Element {
  const text = direction === Direction.Long ? green(direction) : red(direction)
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {text} </div>
}

function GreekBlock(text: any): JSX.Element {
  return <div style={{ fontSize: 15 }}> {text} </div>
}
