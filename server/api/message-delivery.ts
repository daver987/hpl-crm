import twilio from 'twilio'

export default defineEventHandler(async () => {
  const { MessagingResponse } = twilio.twiml
  const twiml = new MessagingResponse()
  twiml.message('Your appointment has been confirmed.')
  return { status: '201' }
})
