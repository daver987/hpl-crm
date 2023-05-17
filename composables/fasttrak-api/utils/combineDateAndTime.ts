//scripts
export function combineDateAndTime(
  dateString: string,
  timeString: string
): string {
  // Remove ordinal suffix from the date string using a regex
  const formattedDateString = dateString.replace(/(st|nd|rd|th)/g, '')
  // Combine the date and time strings
  const combinedDateTime = `${formattedDateString} ${timeString}`
  // Create a Date object
  const dateTimeObject = new Date(combinedDateTime)
  console.log('[COMBINED_DATE_TIME:', dateTimeObject)
  // Convert the Date object to an ISO 8601 date-time string
  return dateTimeObject.toISOString()
}
