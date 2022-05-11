import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
import { Header, Info } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'
import { SUPPORT_LINK } from '../../constants'

function Dov() {
  useEffect(() => ReactGA.pageview('/dov'), [])

  return (
    <StyledContainer>
      <Header primary="DOV investments" />

      <div style={{ display: 'flex', alignContent: 'space-between', width: '100%' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <Comment padding={0} text="Decentralized option vaults are the new gods now" />
        </div>
        <div style={{ marginLeft: 'auto' }}></div>
      </div>
      <br />
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>
        <img height="300" src={require('../../imgs/greeks/poseidon.png')} alt={'god'} />
      </div>
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>Coming Soon!</div>
      <Info>
        {' '}
        Please use{' '}
        <a href={SUPPORT_LINK} target="_blank" rel="noreferrer noopener">
          {' '}
          feature request
        </a>{' '}
        to let us know what you want to see first!{' '}
      </Info>
      <br />
    </StyledContainer>
  )
}

export default Dov
