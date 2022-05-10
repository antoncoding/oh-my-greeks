import React from 'react'
import { IconChat, LinkBase } from '@aragon/ui'

function Feedback() {
  return (
    <LinkBase
      style={{ paddingLeft: 10, paddingTop: 5 }}
      onClick={() => window.open('https://ohmygreeks.canny.io/', '_blank')}
    >
      <IconChat />
    </LinkBase>
  )
}

export default Feedback
