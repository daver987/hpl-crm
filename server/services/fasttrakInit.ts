import { z } from 'zod'

const AuthResponseSchema = z.object({
	item: z.object({
		token: z.object({
			id: z.string(),
			accessToken: z.string(),
			refreshToken: z.string(),
			accessTokenExpirationSeconds: z.number(),
			refreshTokenExpiratinSeconds: z.number(),
		}),
		isExpired: z.boolean(),
		isLocked: z.boolean(),
		lockedUntilDateUTC: z.date().nullable(),
		isMultiCompanyEnabled: z.boolean(),
	}),
	status: z.string(),
	includesOperationalMessage: z.boolean(),
})

type AuthResponse = z.infer<typeof AuthResponseSchema>

export const fasttrakAuth = async (): Promise<AuthResponse> => {
	const runtimeConfig = useRuntimeConfig()
	const config = (partnerAccessKey: string, systemId: string) => ({
		headers: {
			'Partner-Access-Key': partnerAccessKey,
			'Partner-Api-Version': 'v2.1',
			'System-Id': systemId,
			'Content-Type': 'application/json',
		},
	})

	async function authenticateFasttrak(
		systemId: string,
		username: string,
		password: string,
		refreshToken: string
	): Promise<AuthResponse> {
		const requestBody = {
			systemId,
			username,
			password,
			refreshToken,
		}

		try {
			//@ts-ignore
			const data = (await $fetch(
				'https://api.ifasttrak.com/partner/api/authentication/web-service-user',
				{
					method: 'POST',
					body: requestBody,
					...config(runtimeConfig.FASTTRACK_PARTNER_ACCESS_KEY, systemId),
				}
			)) as AuthResponse

			console.log('Fasttrak JWT', data)
			if (data.status === 'FAILURE') {
				throw new Error(`Authentication failed`)
			}

			return {
				...data,
			}
		} catch (error) {
			console.error('Error authenticating with Fasttrak API:', error)
			throw error
		}
	}
	return await authenticateFasttrak(
		runtimeConfig.FASTTRACK_SYSTEM_ID,
		runtimeConfig.FASTTRACK_USER_EMAIL,
		runtimeConfig.FASTTRACK_USER_PASSWORD,
		''
	)
}
