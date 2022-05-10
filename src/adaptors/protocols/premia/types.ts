export type UserOwnedTokenType = {
  id: string
  user: string
  size: string
  option: {
    id: string
    maturity: string
    strike: string
    underlying: {
      symbol: string
    }
    base: {
      symbol: string
    }
    optionType: 'CALL' | 'PUT'
  }
}
