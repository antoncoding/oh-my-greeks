import React, { useState } from 'react'

import SectionTitle from '../../components/SectionHeader'

import { Switch, useToast } from '@aragon/ui'
import { storePreference, getPreference } from '../../utils/storage'
import { SHOW_TESTNET as SHOW_TESTNET_KEY } from '../../constants/storage'

function TestnetSwitch() {
  const mode = getPreference(SHOW_TESTNET_KEY, 'true')
  const toast = useToast()

  const [showTestnet, setShowTestnet] = useState(mode === 'true')

  return (
    <>
      <div style={{ display: 'flex' }}>
        <SectionTitle title="Network setting" />
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ paddingRight: 20 }}> Show Lyra Avalon Testnet Positions </div>
        <div style={{ paddingTop: 3 }}>
          {' '}
          <Switch
            checked={showTestnet}
            onChange={checked => {
              setShowTestnet(checked)
              const newMode = checked ? 'true' : 'false'
              storePreference(SHOW_TESTNET_KEY, newMode)
              toast('Preference Updated')
            }}
          />{' '}
        </div>
      </div>
    </>
  )
}

export default TestnetSwitch
