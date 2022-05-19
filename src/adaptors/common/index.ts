import { EulerAccountBalances, getEulerData } from './euler'

export type AdditionalData = {
  euler: EulerAccountBalances[]
}

export async function getAdditionalData(account: string): Promise<AdditionalData> {
  const euler = await getEulerData(account)
  return {
    euler,
  }
}
