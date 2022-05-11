import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import ThemeSwitch from './Theme'
import ApproveSwitch from './Approval'
import TestnetSwitch from './TestnetSwitch'
import ClearCache from './ClearCache'

function Settings({ setTheme }: { setTheme: any }) {
  useEffect(() => ReactGA.pageview('/settings/'), [])
  return (
    <StyledContainer>
      <Header primary="Settings" />
      <ThemeSwitch setTheme={setTheme} />
      <br />
      <TestnetSwitch />
      <br />
      <ApproveSwitch />
      <br />
      {/* <ZeroXFee />
      <br /> */}
      <ClearCache />
      <br />
      <br />
    </StyledContainer>
  )
}

export default Settings
