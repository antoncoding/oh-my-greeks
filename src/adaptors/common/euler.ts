import BigNumber from 'bignumber.js'
import { querySubgraph } from '../utils'

export type EulerAccountBalancesSubgraph = {
  id: string
  balances: {
    amount: string
    asset: {
      id: string
      symbol: string
    }
  }[]
}

export type EulerAccountBalances = {
  account: string
  balances: {
    amount: BigNumber
    asset: {
      id: string
      symbol: string
    }
  }[]
}

const eulerSubgraph = 'https://api.thegraph.com/subgraphs/name/hboisselle/euler-mainnet'

export async function getEulerData(account: string): Promise<EulerAccountBalances[]> {
  const eulerAccounts = (await querySubgraph(eulerSubgraph, getAccountQuery(account)))[
    'accounts'
  ] as EulerAccountBalancesSubgraph[]

  //
  const mergedAccount = eulerAccounts.map(account => {
    return {
      account: account.id,
      balances: account.balances.map(b => {
        return { asset: b.asset, amount: new BigNumber(b.amount) }
      }),
    }
  })

  return mergedAccount
}

function getAccountQuery(account: string): string {
  return `{
    accounts (where:{
      topLevelAccount: "${account}"
    }) {
      id
      balances {
        amount
        asset {
          id
          symbol
        }
      }
    }
  }  
`
}
