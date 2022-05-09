import React, { useEffect } from 'react'
import ReactGA from 'react-ga'
// import { useHistory } from 'react-router-dom'
import { Header } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'

function HomePage() {
  useEffect(() => ReactGA.pageview('/'), [])
  return (
    <StyledContainer>
      <Header primary="My Onchain Greeks" />

      <Comment padding={0} text="Create, manage and trade decentralized options" />
    </StyledContainer>
  )
}

export default HomePage
