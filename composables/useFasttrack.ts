async function useFasttrakApi(endpoint: string, token: string): Promise<any> {
  const apiUrl = `https://api.ifasttrak.com/partner/api/${endpoint}`

  const headers = {
    'Partner-Access-Key': '8fce58eb8cb843bf9d8c0ad2377d2f1e',
    'Partner-Api-Version': 'v2.1',
    'System-Id': '28AE0C07-CD77-4D72-A0F5-DE99D44DB3C1',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  try {
    const data = await $fetch(apiUrl, {
      method: 'GET',
      headers,
    })
    return data
  } catch (error) {
    console.error(`Error fetching data from Fasttrak API (${endpoint}):`, error)
    throw error
  }
}
