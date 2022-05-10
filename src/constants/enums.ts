export enum OptionType {
  Call = 'Call',
  Put = 'Put',
  PowerPerp = 'PowerPerp',
}

export enum UnderlyingAsset {
  ETH = 'ETH',
  BTC = 'BTC',
  LINK = 'LINK',
  AVAX = 'AVAX',
  USD = 'USD',
}

export enum Direction {
  Long = 'LONG',
  Short = 'SHORT',
}

export enum Protocols {
  Lyra = 'Lyra',
  Premia = 'Premia',
  Opyn = 'Opyn',
  Dopex = 'Dopex',
  // Ribbon = 'Ribbon',
}

export enum Property {
  European = 'European',
  American = 'American',
}

// use number so we can compare breakpoints. (xs < sm)
export enum BreakPoints {
  xs,
  sm,
  md,
  lg,
}
