import React, { useMemo } from 'react'
import { Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import { Header, Button } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'
import { Protocols, protocolToIcon, protocolToLink } from '../../constants'
import BoxButton from '../../components/BoxButton'
import SectionTitle from '../../components/SectionHeader'
import { useConnectedWallet } from '../../contexts/wallet'

// const greekGods = [
//   require('../../imgs/greeks/aphrodite.png'),
//   require('../../imgs/greeks/artemis.png'),
//   require('../../imgs/greeks/atropos.png'),
//   require('../../imgs/greeks/chronos.png'),
//   require('../../imgs/greeks/dionysus.png'),
//   require('../../imgs/greeks/hephaestus.png'),
//   require('../../imgs/greeks/nemesis.png'),
//   require('../../imgs/greeks/poseidon.png'),
//   require('../../imgs/greeks/zeus.png'),
// ]
// const randomIdx = Math.round(Math.random() * 1000) % greekGods.length

function HomePage() {
  const history = useHistory()
  const { user } = useConnectedWallet()

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

      <div style={{ display: 'flex', alignContent: 'space-between', width: '100%' }}>
        <div style={{ alignSelf: 'flex-start' }}>
          <Comment padding={0} text="Manage your cross-chain delta, gamma, theta in the metaverse!" />
        </div>
        <div style={{ marginLeft: 'auto' }}></div>
      </div>
      <br />
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>
        <img height="300" src={require('../../imgs/greeks/dionysus.png')} alt={'god'} />
      </div>
      <div style={{ display: 'flex', padding: 10, justifyContent: 'center' }}>
        <Button mode="positive" onClick={() => history.push(`/positions/${user}`)}>
          {' '}
          Get Started!{' '}
        </Button>
      </div>
      <SectionTitle title={'Integrating...'} />
      <Row>{links}</Row>

      <br />
    </StyledContainer>
  )
}

export default HomePage
