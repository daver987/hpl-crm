import twilio from 'twilio'

export default defineEventHandler(async (event) => {
  const { MessagingResponse } = twilio.twiml
  const twiml = new MessagingResponse()
  twiml.message('Your appointment has been confirmed.')
  return twiml.toString()
})
