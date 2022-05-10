import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import MyPositions from './Positions'
import { UnderlyingAsset } from '../../constants/enums'

export default function Positions() {
  const { account } = useParams()
  useEffect(() => {
    ReactGA.pageview('/account/')
  }, [])
  return (
    <StyledContainer>
      <div style={{ display: 'flex' }}>
        <Header primary="Option Positions" />
      </div>
      <MyPositions account={account} underlying={UnderlyingAsset.ETH} />
    </StyledContainer>
  )
}
