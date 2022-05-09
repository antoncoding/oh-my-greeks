import React from 'react'

const emptyStateRedSrc = require('../imgs/aragon/empty-state-illustration-red.png')
const EmptyState = <img src={emptyStateRedSrc} alt="" width="185" />

export const POSITIONS = {
  default: {
    title: 'No position',
    subtitle: "You don't have any option position",
    illustration: EmptyState,
  },
  loading: {
    title: 'Loading',
    subtitle: 'Fetching user positions... ',
  },
}
