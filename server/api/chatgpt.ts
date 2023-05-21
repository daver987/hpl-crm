export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const data = await $fetch('https://chatgpt-email.info5767.workers.dev/', {
    method: 'POST',
    body: body,
  })
  return 'Executed'
})
