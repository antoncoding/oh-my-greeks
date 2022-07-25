import React, { useMemo, useState } from 'react'
import { DropDown } from '@aragon/ui'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import Dovs from './Dovs'
import { UnderlyingAsset } from '../../constants/enums'
import { Col, Row } from 'react-grid-system'
import { useTokenPrice } from '../../hooks'
import { underlyingToIcon, underlyingToPrimaryAddress } from '../../constants'
import SectionTitle from '../../components/SectionHeader'
import { useAssetVol } from '../../hooks/useVol'

export default function Positions() {
  const { account } = useParams()

  const [selected, setSelected] = useState(0)

  const underlying = useMemo(() => Object.values(UnderlyingAsset)[selected], [selected])

  const { vol } = useAssetVol(underlying)

  const spotPrice = useTokenPrice(underlyingToPrimaryAddress(underlying), 10)

  return (
    <StyledContainer>
      <Row>
        <Col xl={8} lg={8} md={6}>
          <Header primary="DOV Shares" />
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

      <Dovs account={account} underlying={underlying} spotPrice={spotPrice} vol={vol} />
    </StyledContainer>
  )
}
