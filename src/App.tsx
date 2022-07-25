import React, { useState } from 'react'
import { Col, Row, setConfiguration } from 'react-grid-system'
import 'moment-timezone'

import { Main } from '@aragon/ui'
import { walletContext } from './contexts/wallet'

import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

import Positions from './pages/Positions'
import ConnectWallet from './pages/ConnectWallet'
import HomePage from './pages/HomePage'
import Settings from './pages/Settings'

import { useConnection } from './hooks/useConnection'

import { getPreference } from './utils/storage'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { SHOW_SIDE_BAR } from './constants'
import Dov from './pages/DOV'
import Tokens from './pages/Tokens'

function App() {
  const wallet = useConnection()
  const defaultTheme = getPreference('theme', 'light')
  const [theme, setTheme] = useState(defaultTheme)

  const [isSideBarOpen, setSideBarOpen] = useState(getPreference(SHOW_SIDE_BAR, 'true') === 'true')

  setConfiguration({ containerWidths: [540, 620, 760, 980, 1140] })

  return (
    <Router>
      <Main layout={false} theme={theme}>
        <walletContext.Provider value={wallet}>
          <NavBar isSideBarOpen={isSideBarOpen} setSideBarOpen={setSideBarOpen} />
          <Row style={{ height: '100%' }} nogutter>
            {isSideBarOpen && (
              <Col sm={12} md={2} lg={2} xl={2}>
                <SideBar />
              </Col>
            )}
            <Col
              sm={12}
              md={isSideBarOpen ? 10 : 12}
              lg={isSideBarOpen ? 10 : 12}
              xl={isSideBarOpen ? 10 : 12}
              // offset={maincontentOffset}
            >
              <Switch>
                <Route path="/positions/:account">
                  <Positions />
                </Route>
                <Route path="/positions/">
                  <ConnectWallet />
                </Route>
                <Route path="/dovs/:account">
                  <Dov />
                </Route>
                <Route path="/tokens/:account">
                  <Tokens />
                </Route>
                <Route path="/settings/">
                  <Settings setTheme={setTheme} />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Col>
          </Row>
        </walletContext.Provider>
      </Main>
    </Router>
  )
}

export default App
