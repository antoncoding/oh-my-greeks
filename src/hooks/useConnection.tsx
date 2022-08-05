import { useState, useEffect, useCallback, useMemo } from 'react'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'
import Web3 from 'web3'
import { networkToProvider, SupportedNetworks } from '../constants'
import { storePreference } from '../utils/storage'

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
      token: 'rETH',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: networkToProvider[SupportedNetworks.Ropsten],
    },
    {
      id: '0x45',
      token: 'oETH',
      label: 'OP Kovan',
      rpcUrl: networkToProvider[SupportedNetworks.OpKovan],
    },
    {
      id: '0xa',
      token: 'oETH',
      label: 'Optimism',
      rpcUrl: networkToProvider[SupportedNetworks.OpKovan],
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic',
      rpcUrl: networkToProvider[SupportedNetworks.Matic],
    },
    {
      id: '0xa86a',
      token: 'AVAX',
      label: 'Avalanche',
      rpcUrl: networkToProvider[SupportedNetworks.Avalanche],
    },
    {
      id: '0xA4B1',
      token: 'ETH',
      label: 'Arbitrum',
      rpcUrl: networkToProvider[SupportedNetworks.Arbitrum],
    },
  ],
  appMetadata: {
    name: 'Oh My Greeks',
    icon: icon,
    description: 'Manage your on-chain greek exposures',
    recommendedInjectedWallets: [{ name: 'MetaMask', url: 'https://metamask.io' }],
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

  const initNetworkId = useMemo(() => getConnectedNetwork(), [])
  const [networkId, setNetworkId] = useState<SupportedNetworks>(initNetworkId)

  const [web3] = useState<Web3>(new Web3(networkToProvider[SupportedNetworks.Mainnet]))

  const walletsSub = onboard.state.select('wallets')
  const { unsubscribe } = walletsSub.subscribe(wallets => {
    const connectedWallets = wallets.map(({ label }) => label)
    storePreference('connectedWallets', JSON.stringify(connectedWallets))
    setNetworkId(getConnectedNetwork())
  })

  const chainSub = onboard.state.select('chains')
  const { unsubscribe: unsubscribeChain } = chainSub.subscribe(chains => {
    setNetworkId(getConnectedNetwork())
  })

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
      unsubscribeChain()
    }
  }, [unsubscribe, unsubscribeChain])

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

  const switchNetwork = useCallback((selectedNetwork: SupportedNetworks) => {
    onboard.setChain({ chainId: selectedNetwork })
  }, [])

  return { switchNetwork, networkId, user, setUser, web3, connect, disconnect }
}

function getConnectedNetwork() {
  const [primaryWallet] = onboard.state.get().wallets
  if (!primaryWallet) return SupportedNetworks.Mainnet

  let network = (
    primaryWallet.chains.length > 0 ? primaryWallet.chains[0].id : SupportedNetworks.Mainnet
  ) as SupportedNetworks
  if (!Object.values(SupportedNetworks).includes(network)) {
    network = SupportedNetworks.Mainnet
  }
  return network
}
