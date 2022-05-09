import BigNumber from 'bignumber.js'
import { Direction, OptionType, Protocols, SupportedNetworks } from '../constants'
import { Position } from '../types'

export async function getAllPositions(account: string): Promise<Position[]> {
  return [
    {
      chainId: SupportedNetworks.Optimism,
      protocol: Protocols.Lyra,
      strikePrice: new BigNumber(5500),
      expiry: 1669878000,
      type: OptionType.Call, // call or put
      direction: Direction.Long, // long or short
      amount: new BigNumber(10),
      strike: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      collateral: {
        symbol: 'sETH',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
      },
      underlying: {
        symbol: 'sETH',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
      },
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
      strike: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      collateral: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 18,
      },
      underlying: {
        symbol: 'sETH',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
      },
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
      strike: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      collateral: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 18,
      },
      underlying: {
        symbol: 'sETH',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
      },
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
      strike: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      collateral: {
        symbol: 'USDC',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        decimals: 6,
      },
      underlying: {
        symbol: 'sETH',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        decimals: 18,
      },
      collateralAmount: new BigNumber(3000e6),
    },
  ]
}
