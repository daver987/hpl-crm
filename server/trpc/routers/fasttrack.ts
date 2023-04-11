export default defineApiRoute(async (req, res) => {
  const result = await trpc.query('fastTrack.getCompanies', null, {
    req,
    res,
  })

  if (result.error) {
    res.status(result.error?.statusCode || 500).json({
      error: result.error.message,
    })
  } else {
    res.json(result.data)
  }
})
