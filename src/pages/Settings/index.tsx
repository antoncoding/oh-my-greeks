import React from 'react'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import ThemeSwitch from './Theme'
import ApproveSwitch from './Approval'
import DustSetting from './DustSetting'
import ClearCache from './ClearCache'

function Settings({ setTheme }: { setTheme: any }) {
  return (
    <StyledContainer>
      <Header primary="Settings" />
      <ThemeSwitch setTheme={setTheme} />
      <br />
      <ApproveSwitch />
      <br />
      <DustSetting />
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
