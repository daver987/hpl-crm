import twilio from 'twilio'

export default defineEventHandler(async (event) => {
  //setup twilio on the server
  const config = useRuntimeConfig()
  const accountSid = config.TWILIO_ACCOUNT_SID
  const authToken = config.TWILIO_AUTH_TOKEN
  const messagingServiceSid = config.TWILIO_MESSAGING_SERVICE_SID

  const client = twilio(accountSid, authToken)
  const body = await readBody(event)
  const { message, to } = body
  //send message to the client
  await client.messages.create({
    body: message,
    messagingServiceSid: messagingServiceSid,
    to: to,
  })
  return message.sid
})
