import React from 'react'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import ThemeSwitch from './Theme'
import ApproveSwitch from './Approval'
import TestnetSwitch from './TestnetSwitch'
import ClearCache from './ClearCache'

function Settings({ setTheme }: { setTheme: any }) {
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
