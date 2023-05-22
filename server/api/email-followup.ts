import chalk from 'chalk'
import { getChatStream } from '~/utils'

export default defineEventHandler(async (event) => {
  const agentRole =
    'You are a customer service representative for a High Park Livery, a luxury transportation company. '
  const openai = event.context.openai
  const body = await readBody(event)
  console.log(chalk.green(`[EVENT_BODY]`), body)
  if (!body) {
    return
  }
  const stream = await getChatStream(openai, body)

  return sendStream(event, stream)
})
