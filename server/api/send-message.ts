import twilio from 'twilio'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const accountSid = config.TWILIO_ACCOUNT_SID
  const authToken = config.TWILIO_AUTH_TOKEN
  const messagingServiceSid = config.TWILIO_MESSAGING_SERVICE_SID

  try {
    const client = twilio(accountSid, authToken)
    const body = await readBody(event)
    const { message, to } = body
    await client.messages.create({
      body: message,
      messagingServiceSid,
      to,
    })
    return message.sid
  } catch (error) {
    console.error(error)
  }
})
