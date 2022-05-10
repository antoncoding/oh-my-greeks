import BigNumber from 'bignumber.js'
import { Direction, OptionType, Protocols, sETH, SupportedNetworks, UnderlyingAsset } from '../constants'
import { Position } from '../types'

import { USDC } from '../constants'

export async function getPositionsByUnderlying(account: string, underlying: UnderlyingAsset): Promise<Position[]> {
  return [
    {
      chainId: SupportedNetworks.Optimism,
      protocol: Protocols.Lyra,
      strikePrice: new BigNumber(5500),
      expiry: 1669878000,
      type: OptionType.Call, // call or put
      direction: Direction.Long, // long or short
      amount: new BigNumber(10),
      strike: USDC,
      collateral: sETH,
      underlying: sETH,
      collateralAmount: new BigNumber(0),
    },
    {
      chainId: SupportedNetworks.Arbitrum,
      protocol: Protocols.Premia,
      strikePrice: new BigNumber(2800),
      expiry: 1654063200,
      type: OptionType.Put, // call or put
      direction: Direction.Long, // long or short
      amount: new BigNumber(8),
      strike: USDC,
      collateral: USDC,
      underlying: sETH,
      collateralAmount: new BigNumber(0),
    },
    {
      chainId: SupportedNetworks.Arbitrum,
      protocol: Protocols.Premia,
      strikePrice: new BigNumber(2400),
      expiry: 1652824800,
      type: OptionType.Call, // call or put
      direction: Direction.Long, // long or short
      amount: new BigNumber(1),
      strike: USDC,
      collateral: USDC,
      underlying: sETH,
      collateralAmount: new BigNumber(0),
    },
    {
      chainId: SupportedNetworks.Optimism,
      protocol: Protocols.Lyra,
      strikePrice: new BigNumber(2000),
      expiry: 1669878000,
      type: OptionType.Put, // call or put
      direction: Direction.Short, // long or short
      amount: new BigNumber(5),
      strike: USDC,
      collateral: USDC,
      underlying: sETH,
      collateralAmount: new BigNumber(3000e6),
    },
  ]
}
