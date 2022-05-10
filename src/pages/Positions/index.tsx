import React, { useEffect, useMemo, useState } from 'react'
import ReactGA from 'react-ga'
import { DropDown } from '@aragon/ui'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import MyPositions from './Positions'
import { UnderlyingAsset } from '../../constants/enums'
import { Col, Row } from 'react-grid-system'
import { useTokenPrice } from '../../hooks'
import { underlyingToIcon, underlyingToPrimaryAddress } from '../../constants'
import SectionTitle from '../../components/SectionHeader'

export default function Positions() {
  const { account } = useParams()

  const [selected, setSelected] = useState(0)

  const underlying = useMemo(() => Object.values(UnderlyingAsset)[selected], [selected])

  const spotPrice = useTokenPrice(underlyingToPrimaryAddress(underlying), 10)

  useEffect(() => {
    ReactGA.pageview('/positions/')
  }, [])
  return (
    <StyledContainer>
      <Row>
        <Col xl={8} lg={8} md={6}>
          <Header primary="Positions" />
        </Col>
        <Col xl={2} lg={2} md={2}>
          <SectionTitle paddingTop={28} title={`$${spotPrice.toFixed(2)}`} />
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

      <MyPositions account={account} underlying={underlying} spotPrice={spotPrice} />
    </StyledContainer>
  )
}
