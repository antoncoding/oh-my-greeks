import React from 'react'
import Header from '../../components/Header'
import StyledContainer from '../../components/StyledContainer'
import { useParams } from 'react-router-dom'
import TokenTable from './Balances'

export default function Tokens() {
  const { account } = useParams()

  return (
    <StyledContainer>
      <Header primary="Tokens" />

      <TokenTable account={account} />
    </StyledContainer>
  )
}
