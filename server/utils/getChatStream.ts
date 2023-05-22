import { OpenAIApi } from 'openai'

export const getChatStream = async (openai: OpenAIApi, body: string) => {
  const response = await openai.createChatCompletion(
    {
      max_tokens: 2048,
      model: 'gpt-4',
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content:
            'You are a customer service representative for a High Park Livery, a luxury transportation company. ',
        },
        { role: 'user', content: body },
      ],
      stream: true,
    },
    { responseType: 'stream' }
  )

  return response.data
}
