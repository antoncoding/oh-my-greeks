import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import MyPositions from './Positions'

export default function Positions() {
  const { account } = useParams()
  useEffect(() => {
    ReactGA.pageview('/account/')
  }, [])
  return (
    <StyledContainer>
      <Header primary="Option Positions" />
      <MyPositions account={account} />
    </StyledContainer>
  )
}
