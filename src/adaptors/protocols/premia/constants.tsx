export const subgraphMainnet = 'https://api.thegraph.com/subgraphs/name/premiafinance/premiav2'
export const subgraphArbi = 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-arbitrum'

export const positionScale = 18

export const getAccountTokensQuery = (address: string) => {
  return `
  {
    userOwnedOptions (first: 1000, where:{
      user: "${address}"
    }){
      id
      user
      size
      option {
      id
        maturity
        strike
        underlying {
          symbol
          id
        }
        base {
          symbol
          id
        }
        optionType
        
      
    }
  }
}
  `
}
