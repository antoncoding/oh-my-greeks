export type LyraPosition = {
  id: string
  positionId: number
  option: {
    isCall: boolean
  }
  market: {
    id: string
    baseAddress: string
    quoteAddress: string
  }
  strike: {
    strikePrice: string
  }
  board: {
    expiryTimestamp: number
  }
  size: string
  isBaseCollateral: boolean
  collateral: string
  isLong: boolean
}
