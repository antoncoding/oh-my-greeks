export const subgraphMainnet = 'https://api.thegraph.com/subgraphs/name/premiafinance/premiav2'
export const subgraphArbi = 'https://api.thegraph.com/subgraphs/name/premiafinance/premia-arbitrum'

export const getAccountTokensQuery = (address : string) => {
  return `
  {
    userOwnedOptions (where:{
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
        }
        base {
          symbol
        }
        optionType
        
      
    }
  }
}
  `
}