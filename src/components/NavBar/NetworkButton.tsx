import React, { useState, useCallback } from 'react'

import { Button, Modal, useTheme } from '@aragon/ui'

import { useConnectedWallet } from '../../contexts/wallet'
import { isMainnet, networkIdToName, networkToLogo, SupportedNetworks } from '../../constants'
import SectionTitle from '../SectionHeader'

const networkKeys = Object.values(SupportedNetworks)

console.log('networkKeys', networkKeys)

const items = networkKeys.map(k => {
  return {
    id: k,
    title: networkIdToName[k],
    logo: networkToLogo[k],
  }
})

function NetworkButton() {
  const { networkId, switchNetwork } = useConnectedWallet()

  const [opened, setOpened] = useState(false)

  const theme = useTheme()

  const onClick = useCallback(
    networkId => {
      switchNetwork(networkId)
    },
    [switchNetwork],
  )

  return (
    <div>
      <Button
        label="test"
        display="icon"
        icon={<img src={networkToLogo[networkId]} height={30} alt="logo" style={{ borderRadius: 10 }} />}
        onClick={() => {
          setOpened(true)
        }}
      />
      <Modal visible={opened} onClose={() => setOpened(false)} padding={30}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '3%' }}>
          <SectionTitle title="Change Network" />
        </div>

        {items
          .filter(i => isMainnet[i.id])
          .map(i => {
            return (
              <div
                key={i.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  icon={<img src={i.logo} height={30} alt={i.title} />}
                  label={i.title}
                  style={{ minWidth: 300 }}
                  mode={networkId === i.id ? 'strong' : 'normal'}
                  onClick={() => onClick(i.id)}
                />
              </div>
            )
          })}

        <br />
        {/* testnets */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '3%' }}>
          <div style={{ color: theme.contentSecondary, fontSize: 17 }}> Testnets </div>
        </div>
        {items
          .filter(i => !isMainnet[i.id])
          .map(i => {
            return (
              <div
                key={i.id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Button
                  label={i.title}
                  style={{ minWidth: 300 }}
                  mode={networkId === i.id ? 'strong' : 'normal'}
                  onClick={() => onClick(i.id)}
                />
              </div>
            )
          })}
        <br />
      </Modal>
    </div>
  )
}

export default NetworkButton
