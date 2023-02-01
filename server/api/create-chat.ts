import twilio from 'twilio'

const config = useRuntimeConfig()
const accountSid = config.TWILIO_ACCOUNT_SID
const authToken = config.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export default defineEventHandler(async (event) => {
  client.conversations.v1.conversations
    .create({ friendlyName: 'My First Conversation' })
    .then((conversation) => console.log(conversation.sid))
})
