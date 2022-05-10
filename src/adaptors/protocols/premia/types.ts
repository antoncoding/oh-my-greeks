export type UserOwnedTokenType = {
  id: string
  user: string
  size: string
  option: {
    id: string
    maturity: string
    strike: string
    underlying: {
      id: string
      symbol: string
    }
    base: {
      id: string
      symbol: string
    }
    optionType: 'CALL' | 'PUT'
  }
}
