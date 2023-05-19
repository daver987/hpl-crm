export default defineEventHandler(async (event) => {
  const response = await event.context.prisma.fasttrak.findMany({
    select: {
      reservations: true,
    },
  })
  console.log(JSON.stringify(response))
  return response[0]
})
