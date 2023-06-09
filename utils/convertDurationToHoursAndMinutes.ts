export function convertDurationToHoursAndMinutes(
  durationInSeconds: number | null
): {
  hours: number
  minutes: number
} {
  if (typeof durationInSeconds === 'number') {
    const hours = Math.floor(durationInSeconds / 3600)
    const minutes = Math.floor((durationInSeconds % 3600) / 60)
    return { hours, minutes }
  } else {
    throw new Error('Oops you did not pass in a number')
  }
}
