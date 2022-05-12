import React, { useMemo } from 'react'
import { Row, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'
import { Header, Button } from '@aragon/ui'

import Comment from '../../components/Comment'
import StyledContainer from '../../components/StyledContainer'
import { Protocols } from '../../constants'
import BoxButton from '../../components/BoxButton'
import SectionTitle from '../../components/SectionHeader'
import { useConnectedWallet } from '../../contexts/wallet'
import { protocolToAdaptor } from '../../adaptors'

function HomePage() {
  const history = useHistory()
  const { user } = useConnectedWallet()

  const links = useMemo(() => {
    return Object.values(Protocols).map(protocol => {
      const adaptor = protocolToAdaptor(protocol)
      console.log(`adaptor`, adaptor)
      return (
        <Col sm={6} md={4} lg={3} key={protocol}>
          <BoxButton
            title={protocol}
            description=""
            icon={<img src={adaptor.img} alt={protocol} width={50} />}
            onClick={() => {
              window.open(adaptor.url, '_blank')
            }}
          />
        </Col>
      )
    })
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
