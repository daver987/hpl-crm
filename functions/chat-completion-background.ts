import type {
  BackgroundHandler,
  HandlerEvent,
  HandlerContext,
} from '@netlify/functions'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const handler: BackgroundHandler = async (event: HandlerEvent) => {
  if (!event.body) {
    return
  }
  const role =
    'You are a customer service representative for a High Park Livery, a luxury transportation company.'

  let body

  body = JSON.parse(event.body)
  console.log('[EVENT_BODY]', body)

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    max_tokens: 512,
    messages: [
      {
        role: 'system',
        content: role,
      },
      { role: 'user', content: body },
    ],
  })

  const message = completion.data.choices[0].message
  console.log(message)
  return {
    body: JSON.stringify(message),
  }
}
