import React from 'react'
import { Header } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'

function Tokens() {
  return (
    <StyledContainer>
      <Header primary="Tokens" />

      <div style={{ display: 'flex', alignContent: 'space-between', width: '100%' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <Comment padding={0} text="What's your exposure to on-chain vol option products" />
        </div>
        <div style={{ marginLeft: 'auto' }}></div>
      </div>
      <br />
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>
        <img height="300" src={require('../../imgs/greeks/zeus.png')} alt={'god'} />
      </div>
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>Work in Progress...</div>
      <br />
    </StyledContainer>
  )
}

export default Tokens
