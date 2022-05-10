export const querySubgraph = async (endpoint: string, query: string) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  const url = endpoint
  const response = await fetch(url, options)
  const data = await response.json()
  if (data.errors) {
    throw new Error(data.errors[0].message)
  } else {
    return data['data']
  }
}
