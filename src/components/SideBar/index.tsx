import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useTheme, IconHome, IconGrid, IconCoin } from '@aragon/ui'
import SidebarTitle from './SidebarTitle'

import { useConnectedWallet } from '../../contexts/wallet'

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
          title="Tokens"
          icon={<IconCoin />}
          onClick={() => {
            history.push(`/tokens/${user}`)
            setSelectedTab(3)
          }}
          isSelected={selectedTab === 3}
        />
      </div>
    </div>
  )
}

function locationToTabId(location) {
  return location.pathname === '/'
    ? 1
    : location.pathname.includes('/positions/')
    ? 2
    : location.pathname.includes('/tokens/')
    ? 3
    : -1
}
