import { useQuery } from '@tanstack/vue-query'
import { useEvertransit } from './useEverTransit'

export function useCompanies() {
  const { token } = useEvertransit()
  const result = useQuery(['companies'], () =>
    $fetch
      .raw('/api/companies', {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Partner-Access-Key': useRuntimeConfig().FASTTRACK_PARTNER_ACCESS_KEY,
          'Partner-Api-Version': 'v2',
          'System-Id': useRuntimeConfig().FASTTRACK_SYSTEM_ID,
        },
      })
      .then((res) => res.json())
  )

  return result
}
