import BigNumber from 'bignumber.js'
import { OptionType } from '../constants'
const greeks = require('greeks')

const Web3 = require('web3')
const web3 = new Web3()

export function getPositionGreeks(
  spot: BigNumber,
  strikePrice: BigNumber,
  expiry: number,
  vol: number,
  type: OptionType,
  additionalData: any | undefined,
) {
  if (type === OptionType.PowerPerp) {
    const fundingPeriod = 0.04794520548
    const normFactor = additionalData as number
    const scalingFactor = 10000

    const priceUSD = (normFactor * spot.pow(2).toNumber() * Math.exp(vol * vol * fundingPeriod)) / scalingFactor

    const delta = (2 * normFactor * spot.toNumber() * Math.exp(vol * vol * fundingPeriod)) / scalingFactor
    const gamma = 2 * normFactor * Math.exp(vol * vol * fundingPeriod)
    const vega = 2 * vol * fundingPeriod * priceUSD
    const theta = vol * vol * priceUSD
    const rho = 0
    return { delta, gamma, vega, theta, rho }
  }
  // put or call

  const now = Date.now() / 1000
  const timeToExpiryInYear = (expiry - now) / (86400 * 365)
  const typeStr = type === OptionType.Call ? 'call' : 'put'
  const delta = greeks.getDelta(spot.toNumber(), strikePrice.toNumber(), timeToExpiryInYear, vol, 0.05, typeStr)
  const gamma = greeks.getGamma(spot.toNumber(), strikePrice.toNumber(), timeToExpiryInYear, vol, 0.05, typeStr)
  const vega = greeks.getVega(spot.toNumber(), strikePrice.toNumber(), timeToExpiryInYear, vol, 0.05, typeStr)
  const theta = greeks.getTheta(spot.toNumber(), strikePrice.toNumber(), timeToExpiryInYear, vol, 0.05, typeStr)
  const rho = greeks.getRho(spot.toNumber(), strikePrice.toNumber(), timeToExpiryInYear, vol, 0.05, typeStr)
  return { delta, gamma, vega, theta, rho }
}

export function toTokenAmount(wei: BigNumber | number | string, decimals: number) {
  return new BigNumber(wei).div(new BigNumber(10).pow(new BigNumber(decimals)))
}

export function fromTokenAmount(amount: BigNumber, decimals: number) {
  return amount.times(new BigNumber(10).pow(new BigNumber(decimals)))
}

export function timeSince(timeStamp) {
  const now = new Date()
  const secondsPast = (now.getTime() - timeStamp) / 1000
  if (secondsPast < 60) {
    return `${parseInt(secondsPast.toString(), 10)}s ago`
  }
  if (secondsPast < 3600) {
    return `${parseInt((secondsPast / 60).toString(), 10)}m ago`
  }
  if (secondsPast <= 86400) {
    return `${parseInt((secondsPast / 3600).toString(), 10)}h ago`
  }
  if (secondsPast > 86400) {
    const ts = new Date(timeStamp)
    const day = ts.getDate()
    const month = (ts.toDateString().match(/ [a-zA-Z]*/) as RegExpMatchArray)[0].replace(' ', '')
    const year = ts.getFullYear() === now.getFullYear() ? '' : ` ${ts.getFullYear()}`
    return `${day} ${month}${year}`
  }

  return timeStamp
}

export function expiryToDate(timestamp: number | string) {
  const timestampNum = Number(timestamp)
  return new Date(timestampNum * 1000).toDateString()
}

export const isAddress = web3.utils.isAddress

/**
 * @returns {number} timestamp (in s)
 */
export function getNextFriday(): number {
  const date = new Date()
  date.setUTCDate(date.getUTCDate() + ((7 + 5 - date.getUTCDay()) % 7))
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  date.setUTCHours(8)
  return date.getTime() / 1000
}
