import chalk from 'chalk'

export default defineEventHandler(async (event) => {
  const openai = event.context.openai
  const body = await readBody(event)
  console.log(chalk.green(`[EVENT_BODY]`), body)
  if (!body) {
    return
  }
  const stream = await getChatStream(openai, body)

  return sendStream(event, stream)
})
