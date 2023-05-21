import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: useRuntimeConfig().OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

exports.handler = async (event, context) => {
  const role =
    'You are a customer service representative for a High Park Livery, a luxury transportation company.'

  const body = JSON.parse(event.body)

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
    statusCode: 200,
    body: JSON.stringify(message),
  }
}
