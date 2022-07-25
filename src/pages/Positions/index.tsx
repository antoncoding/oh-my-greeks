import React, { useMemo, useState } from 'react'
import { DropDown, DataView, Info } from '@aragon/ui'

// main tables
import PlainPositions from './Positions'
import DOVs from './Dovs'

import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import { UnderlyingAsset } from '../../constants/enums'
import { Col, Row } from 'react-grid-system'
import { useTokenPrice } from '../../hooks'
import { underlyingToIcon, underlyingToPrimaryAddress } from '../../constants'
import SectionTitle from '../../components/SectionHeader'
import { useAssetVol } from '../../hooks/useVol'
import { usePositions } from '../../hooks/usePositions'
import { getWeightedPositionGreeks, toTokenAmount } from '../../utils/math'
import { PlainOptionWithGreeks } from '../../types'
import { useDOVs } from '../../hooks/useDOVs'
import { POSITIONS } from '../../constants/dataviewContents'
import { mergeGreeks } from '../../utils/others'

export default function Positions() {
  const { account } = useParams()

  const [selected, setSelected] = useState(0)

  const underlying = useMemo(() => Object.values(UnderlyingAsset)[selected], [selected])

  const { vol } = useAssetVol(underlying)

  const spotPrice = useTokenPrice(underlyingToPrimaryAddress(underlying), 10)

  // plain positions

  const { positions, isLoading: isLoadingPositions } = usePositions(account, underlying)

  const positionsWithGreeks: PlainOptionWithGreeks[] = useMemo(() => {
    return positions.map(position => {
      // todo: use implied vol for each strike?
      const greeks = getWeightedPositionGreeks(
        spotPrice,
        position.strikePrice,
        position.expiry,
        vol / 100,
        position.type,
        position.amount,
        position.direction,
        position.additionalData,
      )

      const collateralIsUnderlying = position.collateral && position.collateral.asset === underlying
      const collateralDelta = collateralIsUnderlying
        ? toTokenAmount(position.collateralAmount, position.collateral.decimals).toNumber()
        : 0

      return {
        ...position,
        ...greeks,
        collateralDelta,
      }
    })
  }, [positions, spotPrice, vol, underlying])

  const plainPositionAggGreeks = useMemo(() => {
    return mergeGreeks(positionsWithGreeks)
  }, [positionsWithGreeks])

  // calculate DOV positions

  const { dovs, isLoading: isLoadingDov } = useDOVs(account, underlying)

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
        aggGreeks = mergeGreeks([aggGreeks, greeks])
      }

      const collateralIsUnderlying = dov.collateral && dov.collateral.asset === underlying
      const collateralDelta = collateralIsUnderlying
        ? toTokenAmount(dov.collateralAmount, dov.collateral.decimals).toNumber()
        : 0

      return {
        ...dov,
        posGreeks,
        aggGreeks,
        collateralDelta,
      }
    })
  }, [dovs, spotPrice, vol, underlying])

  const dovTotalGreeks = useMemo(() => {
    const greeks = dovWithGreeks.map(d => d.aggGreeks)
    return mergeGreeks(greeks)
  }, [dovWithGreeks])

  return (
    <StyledContainer>
      <Row>
        <Col xl={8} lg={8} md={6}>
          <Header primary="Positions" />
        </Col>
        <Col xl={1} lg={1} md={1}>
          <SectionTitle paddingTop={29} title={`$${spotPrice.toFixed(2)}`} />
        </Col>
        <Col xl={1} lg={1} md={1}>
          <div style={{ paddingTop: 34, paddingLeft: 10, fontSize: 15, opacity: 0.8 }}> {vol.toFixed(3)}% </div>
        </Col>
        <Col xl={2} lg={2} md={4}>
          <div style={{ paddingTop: 25, paddingRight: 20 }}>
            <DropDown
              items={Object.values(UnderlyingAsset)
                .slice(0, Object.values(UnderlyingAsset).length - 1) // don't show USD (stable) in the dropdown
                .map(underlying => (
                  <div style={{ display: 'flex' }}>
                    <img width={20} style={{ marginTop: 2 }} src={underlyingToIcon(underlying)} alt={underlying} />
                    <div style={{ paddingLeft: 12 }}> {underlying} </div>
                  </div>
                ))}
              selected={selected}
              onChange={setSelected}
              wide
            />
          </div>
        </Col>
      </Row>

      <PlainPositions
        isLoading={isLoadingPositions}
        underlying={underlying}
        positionsWithGreeks={positionsWithGreeks}
      />
      <DOVs isLoading={isLoadingDov} dovWithGreeks={dovWithGreeks}></DOVs>
      <DataView
        status={isLoadingPositions || isLoadingDov ? 'loading' : 'default'}
        fields={['delta', 'gamma', 'vega', 'theta', 'rho']}
        emptyState={POSITIONS}
        entries={[mergeGreeks([dovTotalGreeks, plainPositionAggGreeks])]}
        tableRowHeight={47}
        renderEntry={(data: PlainOptionWithGreeks) => {
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
    </StyledContainer>
  )
}
