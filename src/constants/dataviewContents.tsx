import React from 'react'

export const POSITIONS = {
  default: {
    title: 'No active positions',
    subtitle: "You don't have opened option position to this asset",
    illustration: null,
  },
  loading: {
    title: 'Loading',
    subtitle: 'Fetching user positions... ',
    illustration: null,
  },
  'empty-filters': {
    displayLoader: false,
    title: 'No results found.',
    subtitle: 'We can’t find any item matching your filter selection.',
    illustration: null,
    clearLabel: 'Clear filters',
  },
}

export const DOVS = {
  default: {
    title: 'No investment in DOVs',
    subtitle: "You don't have exposure through DOVs",
    illustration: null,
  },
  loading: {
    title: 'Loading',
    subtitle: 'Fetching DOV shares... ',
    illustration: null,
  },
  'empty-filters': {
    displayLoader: false,
    title: 'No results found.',
    subtitle: 'We can’t find any item matching your filter selection.',
    illustration: null,
    clearLabel: 'Clear filters',
  },
}

export const TOKEN_BALANCE = {
  default: {
    title: 'No Tokens!',
    subtitle: "You don't hold any of the team tokens. NGMI.",
    illustration: <img src={require('../imgs/greeks/zeus.png')} height={200} alt="empty.." />,
  },
  loading: {
    title: 'Loading',
    subtitle: 'Fetching token balances... ',
    illustration: null,
  },
  'empty-filters': {
    displayLoader: false,
    title: 'No results found.',
    subtitle: 'We can’t find any item matching your filter selection.',
    illustration: null,
    clearLabel: 'Clear filters',
  },
}
