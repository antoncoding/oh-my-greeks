import React, { useCallback, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, LinkBase, Box } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TypeTag from '../../components/ActionBadge'
import { DOVS } from '../../constants/dataviewContents'

import { green, red, secondary } from '../../components/StyleDiv'
import { DovPosition } from '../../types'
import { Direction, DUST_AMOUNT, networkToLogo } from '../../constants'
import { toTokenAmount } from '../../utils/math'
import { protocolToAdaptor } from '../../adaptors'
import { getPreference } from '../../utils/storage'
import { showExpiryShort } from '../../utils/others'

const digits = getPreference(DUST_AMOUNT, '0.01').split('.')[1].length

export default function Positions({ isLoading, dovWithGreeks }: { isLoading: boolean; dovWithGreeks: any }) {
  const [page, setPage] = useState(0)

  const renderVaultRow = useCallback(
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
        GreekBlock(p.aggGreeks.delta.toFixed(4)),
        GreekBlock(p.aggGreeks.gamma.toFixed(5)),
        GreekBlock(p.aggGreeks.vega.toFixed(4)),
        GreekBlock(p.aggGreeks.theta.toFixed(4)),
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

  const renderEntryExpansion = useCallback(
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
      let entries = []
      for (let i = 0; i < p.positions.length; i++) {
        const position = p.positions[i]
        const greeks = p.posGreeks[i]
        entries.push({
          direction: position.direction,
          type: position.type,
          strike: position.strikePrice,
          expiry: position.expiry,
          amount: position.amount,
          delta: greeks.delta,
          gamma: greeks.gamma,
          vega: greeks.vega,
          theta: greeks.theta,
        })
      }
      // return [['100', '200'], ['100', '2d0']]
      return (
        <div style={{ width: '100%' }}>
          <Box>
            <DataView
              width="100%"
              mode="table"
              fields={['', 'Direction', 'type', 'strike', 'expiry', 'amount', 'delta', 'gamma', 'vega', 'theta', '']}
              tableRowHeight={40}
              entries={entries}
              renderEntry={p => {
                return [
                  '',
                  DirectionBlock(p.direction),
                  <TypeTag type={p.type} />,
                  secondary(p.strike.isZero() ? '-' : `${p.strike.integerValue().toString()}`),
                  secondary(showExpiryShort(p.expiry)),
                  Size(p.amount),
                  GreekBlock(p.delta.toFixed(4)),
                  GreekBlock(p.gamma.toFixed(4)),
                  GreekBlock(p.vega.toFixed(4)),
                  GreekBlock(p.theta.toFixed(4)),
                  '',
                ]
              }}
              entriesPerPage={10}
            />
          </Box>
        </div>
      )
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
        emptyState={DOVS}
        entries={dovWithGreeks}
        renderEntry={renderVaultRow}
        renderEntryExpansion={renderEntryExpansion}
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

function DirectionBlock(direction: Direction): JSX.Element {
  const text = direction === Direction.Long ? green(direction) : red(direction)
  return <div style={{ paddingRight: '5px', fontSize: 16 }}> {text} </div>
}
