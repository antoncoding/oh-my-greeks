import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Visible } from 'react-grid-system'

import { useTheme, IconHome, IconGrid, LinkBase, IconCoin, IconDashedSquare } from '@aragon/ui'
import SidebarTitle from './SidebarTitle'

import { useConnectedWallet } from '../../contexts/wallet'

const hash = process.env.REACT_APP_VERSION || '0x00'

export default function SideBar() {
  const theme = useTheme()
  const history = useHistory()

  history.listen(location => {
    setSelectedTab(locationToTabId(location))
  })

  const { user } = useConnectedWallet()

  const defaultSelectedTab = useMemo(() => locationToTabId(history.location), [history.location])

  const [selectedTab, setSelectedTab] = useState(defaultSelectedTab)

  return (
    <div
      style={{
        backgroundColor: theme.surface,
        height: '100%',
        width: '100%',
        borderRight: '1px solid',
        borderColor: theme.border,
      }}
    >
      <div style={{ paddingTop: '5%' }}>
        <SidebarTitle
          title="Home"
          icon={<IconHome />}
          onClick={() => {
            history.push('/')
            setSelectedTab(1)
          }}
          isSelected={selectedTab === 1}
        />
        <SidebarTitle
          title="Positions"
          icon={<IconGrid />}
          onClick={() => {
            history.push(`/positions/${user}`)
            setSelectedTab(2)
          }}
          isSelected={selectedTab === 2}
        />
        <SidebarTitle
          title="DOVs"
          icon={<IconDashedSquare />}
          onClick={() => {
            history.push(`/dovs/`)
            setSelectedTab(3)
          }}
          isSelected={selectedTab === 3}
        />
        <SidebarTitle
          title="Tokens"
          icon={<IconCoin />}
          onClick={() => {
            history.push(`/tokens/${user}`)
            setSelectedTab(4)
          }}
          isSelected={selectedTab === 4}
        />
      </div>
      <Visible xl lg xxl md>
        <div
          style={{
            color: theme.contentSecondary,
            padding: '10px',
            position: 'fixed',
            bottom: '0px',
          }}
        >
          Commit Hash{' '}
          <LinkBase external href={`https://github.com/antoncoding/my-options/commit/${hash}`}>
            {' '}
            {hash}{' '}
          </LinkBase>
        </div>
      </Visible>
    </div>
  )
}

function locationToTabId(location) {
  return location.pathname === '/'
    ? 1
    : location.pathname.includes('/positions/')
    ? 2
    : location.pathname.includes('/dovs/')
    ? 3
    : location.pathname.includes('/tokens/')
    ? 4
    : -1
}
