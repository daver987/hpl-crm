import twilio from 'twilio'

const config = useRuntimeConfig()
const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    console.log(body)
    const conversation = await client.conversations.v1.conversations.create({
      friendlyName: body.value,
    })
    console.log('Server created conversation', conversation)
    return conversation
  } catch (e) {
    return 'chat'
  }
})
