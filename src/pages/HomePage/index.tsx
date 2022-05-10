import React, { useEffect, useMemo } from 'react'
import ReactGA from 'react-ga'
import { Row, Col } from 'react-grid-system'
import { Header } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'
import { Protocols, protocolToIcon, protocolToLink } from '../../constants'
import BoxButton from '../../components/BoxButton'
function HomePage() {
  useEffect(() => ReactGA.pageview('/'), [])

  const links = useMemo(() => {
    return Object.values(Protocols).map(protocol => (
      <Col sm={6} md={4} lg={3} key={protocol}>
        <BoxButton
          title={protocol}
          description=""
          icon={<img src={protocolToIcon(protocol)} alt={protocol} width={50} />}
          onClick={() => {
            window.open(protocolToLink(protocol), '_blank')
          }}
        />
      </Col>
    ))
  }, [])

  return (
    <StyledContainer>
      <Header primary="Oh My Greeks" />

      <Comment padding={0} text="Manage your cross-chain delta, gamma, theta in the metaverse!" />
      <br />
      <Row>{links}</Row>
    </StyledContainer>
  )
}

export default HomePage
