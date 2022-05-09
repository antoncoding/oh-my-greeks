import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { DataView, Timer } from '@aragon/ui'

import SectionTitle from '../../components/SectionHeader'
import TokenAmount from '../../components/TokenAmount'
import TypeTag from '../../components/ActionBadge'

import { usePositions } from '../../hooks/usePositions'

import { useConnectedWallet } from '../../contexts/wallet'
import { showExpiryText, sortByExpiryThanStrike } from '../../utils/others'

import { POSITIONS } from '../../constants/dataviewContents'

import { secondary, green, red } from '../../components/StyleDiv'
import { useCustomToast } from '../../hooks'
import { Position } from '../../types'
import { Direction } from '../../constants'

export default function Positions({ account }: { account: string }) {
  const { networkId, user } = useConnectedWallet()
  const [page, setPage] = useState(0)

  const toast = useCustomToast()

  const { positions, isLoading: isLoadingBalance } = usePositions(account)

  const renderPositionRow = useCallback(
    (position: Position) => {
      return [
        DirectionBlock(position.direction),
        <TypeTag type={position.type} />,
        secondary(`${position.strikePrice.integerValue().toString()} USD`),
        Size(position.amount, position.direction),
        secondary(showExpiryText(position.expiry)),
        position.collateralAmount.gt(0) ? (
          <TokenAmount chainId={networkId} token={position.collateral} amount={position.collateralAmount.toString()} />
        ) : (
          '-'
        ),

        position.protocol,
      ]
    },
    [networkId],
  )

  return (
    <>
      <DataView
        status={isLoadingBalance ? 'loading' : 'default'}
        heading={<SectionTitle title="ETH Options" />}
        fields={['direction', 'type', 'strike', 'amount', 'expiry', 'collateral', 'platform']}
        emptyState={POSITIONS}
        entries={positions.sort((a, b) => sortByExpiryThanStrike(a, b)) || []}
        renderEntry={renderPositionRow}
        entriesPerPage={5}
        page={page}
        onPageChange={setPage}
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
