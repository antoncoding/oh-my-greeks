import { useState, useEffect } from 'react'
import useWebSocket from 'react-use-websocket'
import { UnderlyingAsset, DERIBIT_WEBSOCKET_ENDPOINT, assetToPairString } from '../constants'

export function useAssetVol(asset: UnderlyingAsset) {
  //Public API that will echo messages sent to it back to the client
  const [vol, setVol] = useState<number>(100)
  // const [lastChannel, setLastChannel] = useState<undefined | string>()
  const [pair, setPair] = useState<undefined | string>()

  const { sendMessage, lastMessage, readyState } = useWebSocket(DERIBIT_WEBSOCKET_ENDPOINT)

  useEffect(() => {
    const pairStr = assetToPairString(asset)
    const channel = `deribit_volatility_index.${pairStr}`
    const msg = {
      jsonrpc: '2.0',
      method: 'public/subscribe',
      id: Math.floor(Math.random() * 100),
      params: {
        channels: [channel],
      },
    }
    sendMessage(JSON.stringify(msg))
    // setLastChannel(channel)
    setPair(pairStr)
  }, [asset, sendMessage])

  useEffect(() => {
    if (lastMessage !== null) {
      const params = JSON.parse(lastMessage.data).params
      if (params && params.data) {
        const index = params.data.index_name
        if (pair === index) setVol(params.data.volatility)
      }
    }
  }, [lastMessage, pair])

  return { readyState, vol }
}
