import React from 'react'
import { IconChat, LinkBase } from '@aragon/ui'
import { SUPPORT_LINK } from '../../constants'

function Feedback() {
  return (
    <LinkBase style={{ paddingLeft: 10, paddingTop: 5 }} onClick={() => window.open(SUPPORT_LINK, '_blank')}>
      <IconChat />
    </LinkBase>
  )
}

export default Feedback
