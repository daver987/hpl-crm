export default defineEventHandler(async (event) => {
  const role =
    'You are a customer service representative for a High Park Livery, a luxury transportation company. '
  const openai = event.context.openai
  const body = await readBody(event)

  const completion = await openai.createChatCompletion({
    model: 'gpt-4',
    max_tokens: 512,
    messages: [
      {
        role: 'system',
        content:
          'You are a customer service representative for a High Park Livery, a luxury transportation company. ',
      },
      { role: 'user', content: body },
    ],
  })
  const message = completion.data.choices[0].message
  console.log(message.content)
  return message
})
