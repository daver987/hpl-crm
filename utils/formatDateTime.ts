import { format, toDate } from 'date-fns'

export const formatDateTimeTwo = (date: any) => {
  return format(new Date(date), 'MMMM dd, yyyy hh:mm a')
}

const formatDate = (date: any) => {
  return toDate(new Date(date))
}

const formatTime = (time: any) => {
  return toDate(new Date(time))
}

export const concatDateTime = (dateString: string, timeString: string) => {
  const date = format(formatDate(dateString), 'MMMM dd, yyyy')
  const time = format(formatTime(timeString), 'hh:mm a')
  return `${date} ${time}`
}
