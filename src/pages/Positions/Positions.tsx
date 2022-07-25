import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, LinkBase } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TypeTag from '../../components/ActionBadge'

import { showExpiryText, sortByExpiryThanStrike } from '../../utils/others'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary, green, red } from '../../components/StyleDiv'
import { PlainOptionWithGreeks, Position } from '../../types'
import { Direction, DUST_AMOUNT, networkToLogo, UnderlyingAsset } from '../../constants'
import { toTokenAmount } from '../../utils/math'
import { protocolToAdaptor } from '../../adaptors'
import { getPreference } from '../../utils/storage'

const digits = getPreference(DUST_AMOUNT, '0.01').split('.')[1].length

export default function VanillaPositionsTable({
  isLoading,
  underlying,
  positionsWithGreeks,
}: {
  isLoading: boolean
  underlying: UnderlyingAsset
  positionsWithGreeks: PlainOptionWithGreeks[]
}) {
  const [page, setPage] = useState(0)

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
        secondary(p.strikePrice.isZero() ? '-' : `${p.strikePrice.integerValue().toString()}`),
        secondary(showExpiryText(p.expiry)),
        Size(p.amount, p.direction),
        GreekBlock(p.delta.toFixed(4)),
        GreekBlock(p.gamma.toFixed(4)),
        GreekBlock(p.vega.toFixed(4)),
        GreekBlock(p.theta.toFixed(4)),
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
        status={isLoading ? 'loading' : 'default'}
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
        entries={positionsWithGreeks.sort((a, b) => sortByExpiryThanStrike(a, b)) || []}
        renderEntry={renderPositionRow}
        entriesPerPage={10}
        page={page}
        onPageChange={setPage}
      />
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
