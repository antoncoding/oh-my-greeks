import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, LinkBase } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary } from '../../components/StyleDiv'
import { DovPosition } from '../../types'
import { DUST_AMOUNT, networkToLogo } from '../../constants'
import { toTokenAmount } from '../../utils/math'
import { protocolToAdaptor } from '../../adaptors'
import { getPreference } from '../../utils/storage'

const digits = getPreference(DUST_AMOUNT, '0.01').split('.')[1].length

export default function Positions({ isLoading, dovWithGreeks }: { isLoading: boolean; dovWithGreeks: any }) {
  const [page, setPage] = useState(0)

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
        p.name,
        Size(p.balance),
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
        status={isLoading ? 'loading' : 'default'}
        heading={<SectionTitle title={`DOV Shares`} />}
        fields={['Name', 'balance', 'delta', 'gamma', 'vega', 'theta', 'collateral', 'protocol']}
        tableRowHeight={45}
        emptyState={POSITIONS}
        entries={dovWithGreeks}
        renderEntry={renderPositionRow}
        entriesPerPage={10}
        page={page}
        onPageChange={setPage}
      />
    </>
  )
}

function Size(payout: BigNumber): JSX.Element {
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {payout.toFormat(digits)} </div>
}

function GreekBlock(text: any): JSX.Element {
  return <div style={{ fontSize: 15 }}> {text} </div>
}
