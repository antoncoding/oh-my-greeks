import React, { useState, useMemo } from 'react'

import { Token } from '../../types'
import { EmptyToken } from '../TokenDisplay'

import { TokenAmount as AragonTokenAmount, LinkBase, Modal, AddressField } from '@aragon/ui'

type TokenAmountProps = {
  token: Token
  amount: string
  chainId: number
}

export default function TokenAmount({ token, amount, chainId }: TokenAmountProps) {
  const [open, setOpen] = useState(false)

  const imgUrl = useMemo(() => {
    return token.img
  }, [token])

  const symbol = token === null ? '' : token?.symbol

  return token ? (
    <>
      <LinkBase onClick={() => setOpen(true)}>
        <AragonTokenAmount
          address={token.addresses[chainId]}
          amount={amount}
          chainId={chainId}
          symbol={symbol}
          decimals={token.decimals}
          iconUrl={imgUrl}
          digits={8}
        />
      </LinkBase>
      <Modal visible={open} onClose={() => setOpen(false)}>
        <AddressField address={token.addresses[chainId]} />
      </Modal>
    </>
  ) : (
    <EmptyToken />
  )
}
