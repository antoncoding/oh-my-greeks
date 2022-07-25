export type RibbonVaultAccount = {
  id: string
  shares: string
  totalStakedShares: string
  totalBalance: string
  vault: {
    id: string
    underlyingAsset: string
    name: string
    totalBalance: string
  }
}

export type RibbonShortVault = {
  option: string
  strikePrice: string
  expiry: string
  mintAmount: string
}
