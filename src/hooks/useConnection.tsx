import { useState, useEffect, useCallback } from 'react'
import { getPreference } from '../utils/storage'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import Web3 from 'web3'
import { networkToProvider, SupportedNetworks } from '../constants'

const icon = require('../imgs/greeks/favicon.ico')

const BLOCKNATIVE_KEY = process.env.REACT_APP_BLOCKNATIVE_KEY

const injected = injectedModule()
const walletConnect = walletConnectModule()

const onboard = Onboard({
  apiKey: BLOCKNATIVE_KEY, // [String] The API key created by step one above
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: networkToProvider[SupportedNetworks.Mainnet],
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: networkToProvider[SupportedNetworks.Ropsten],
    },
  ],
  appMetadata: {
    name: 'Oh My Greeks',
    icon: icon, // svg string icon
    description: 'Swap tokens for other tokens',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    ],
  },
  accountCenter: {
    desktop: {
      position: 'bottomRight',
      enabled: true,
      minimal: true,
    },
    mobile: {
      position: 'topRight',
      enabled: true,
      minimal: true,
    },
  },
})

export const useConnection = () => {
  const [user, setUser] = useState<string>('')

  // const [onboard, setOnboard] = useState<any>(null)

  const [web3] = useState<Web3>(new Web3(networkToProvider[SupportedNetworks.Mainnet]))

  const storedNetwork = Number(getPreference('gamma-networkId', '1'))
  const [networkId] = useState<SupportedNetworks>(storedNetwork)

  const walletsSub = onboard.state.select('wallets')
  const { unsubscribe } = walletsSub.subscribe(wallets => {
    const connectedWallets = wallets.map(({ label }) => label)
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets))
  })

  // const handleNetworkChange = useCallback(
  //   _networkId => {
  //     if (_networkId in SupportedNetworks) {
  //       setNetworkId(_networkId)
  //       storePreference('gamma-networkId', _networkId.toString())
  //     }
  //     if (onboard)
  //       onboard.config({
  //         networkId: _networkId,
  //       })
  //   },
  //   [onboard],
  // )

  // get last connection info and try to set default user to previous connected account.
  useEffect(() => {
    async function getDefault() {
      if (!onboard) return
      const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets'))

      if (previouslyConnectedWallets.length > 0) {
        // Connect the most recently connected wallet (first in the array)
        // connect "silently" and disable all onboard modals to avoid them flashing on page load
        const wallets = await onboard.connectWallet({
          autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
        })
        setUser(wallets[0].accounts[0].address)
      }
    }
    getDefault()

    // cleanup function
    return () => {
      unsubscribe()
    }
  }, [unsubscribe])

  const connect = useCallback(async () => {
    if (!onboard) return
    const wallets = await onboard.connectWallet()
    setUser(wallets[0].accounts[0].address)
    return wallets[0].accounts[0].address
  }, [])

  const disconnect = useCallback(async () => {
    const [primaryWallet] = onboard.state.get().wallets
    try {
      await onboard.disconnectWallet({ label: primaryWallet.label })
    } catch {
      console.log('currently in view mode. account is not connected to wallets')
    }
    setUser('')
  }, [])

  return { networkId, user, setUser, web3, connect, disconnect }
}
