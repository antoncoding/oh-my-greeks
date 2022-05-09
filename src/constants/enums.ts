export enum OptionType {
  Call = 'Call',
  Put = 'Put',
}

export enum Direction {
  Long = 'LONG',
  Short = 'SHORT',
}

export enum Protocols {
  Lyra = 'Lyra',
  Premia = 'Premia',
  Dopex = 'Dopex',
  Ribbon = 'Ribbon',
}

export enum Property {
  European = 'European',
  American = 'American',
  Perpetual = 'Perpetual',
  PowerPerp = 'PowerPerp',
}

export enum DeadlineUnit {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
}

export enum Errors {
  NO_ERROR = 'no error',
  INSUFFICIENT_LIQUIDITY = 'Insufficient Liquidity',
  INSUFFICIENT_BALANCE = 'Insufficient Balance',
}

export enum Spenders {
  MarginPool,
  ZeroXExchange,
}

// use number so we can compare breakpoints. (xs < sm)
export enum BreakPoints {
  xs,
  sm,
  md,
  lg,
}
