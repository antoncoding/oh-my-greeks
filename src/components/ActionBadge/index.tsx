import React from 'react'

import { Tag } from '@aragon/ui'
import { OptionType } from '../../constants'

export default function OptionTypeToTag({ type }: { type: OptionType }) {
  if (type === OptionType.Call) {
    return CallTag()
  } else if (type === OptionType.Put) {
    return PutTag()
  } else if (type === OptionType.PowerPerp) {
    return PowerPerpTag()
  }
}

export function PutTag() {
  return (
    <Tag color="#800000" background="#ffb3b3" size="normal">
      Put{' '}
    </Tag>
    // <Tag color="#004080" background="#b3d9ff" size="normal">
    //   {' '}

    // </Tag>
  )
}

export function CallTag() {
  return (
    // <Tag color="#800000" background="#ffb3b3" size="normal">
    //   {' '}
    //   Call{' '}
    // </Tag>
    <Tag color="#004080" background="#b3d9ff" size="normal">
      {' '}
      Call{' '}
    </Tag>
  )
}

export function PowerPerpTag() {
  return <Tag size="normal">Squeeth </Tag>
}

// export function WithdrawCollateralBadge() {
//   return (
//     <Tag color="#004080" background="#b3d9ff" size="normal">
//       {' '}
//       Withdraw Collateral{' '}
//     </Tag>
//   )
// }

// export function DepositLongBadge() {
//   return (
//     <Tag color="#006600" background="#c2f0c2" size="normal">
//       {' '}
//       Deposit Long{' '}
//     </Tag>
//   )
// }

// export function WithdrawLongBadge() {
//   return (
//     <Tag color="#006600" background="#c2f0c2" size="normal">
//       {' '}
//       Withdraw Long{' '}
//     </Tag>
//   )
// }

export function BurnShortBadge() {
  return (
    <Tag color="#800000" background="#ffb3b3" size="normal">
      {' '}
      Burn Short{' '}
    </Tag>
  )
}

export function SettleBadge() {
  return (
    <Tag color="#FFC300" background="#FFF8BC" size="normal">
      {' '}
      Settle Vault{' '}
    </Tag>
  )
}

export function OtherBadge() {
  return <Tag size="normal"> Others </Tag>
}
