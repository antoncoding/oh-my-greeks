import { UnderlyingAsset } from './enums'

export const DERIBIT_WEBSOCKET_ENDPOINT = 'wss://www.deribit.com/ws/api/v2'

export const assetToPairString = (asset: UnderlyingAsset) => {
  switch (asset) {
    case UnderlyingAsset.BTC:
      return 'btc_usd'
    case UnderlyingAsset.ETH:
      return 'eth_usd'
    default: {
      console.log('Using Default vol: ETH')
      return 'eth_usd'
    }
  }
}
