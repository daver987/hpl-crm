interface GPTResponse {
  role: string
  content: string
}

export function formatResponse(response: GPTResponse | null): string {
  if (response === null || response.content.trim() === '') {
    return 'Still generating your personalized message. Please wait...'
  }

  const content = response.content
  return content.replace(/\n/g, '<br/>')
}
