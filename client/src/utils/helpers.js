import { formatDistanceToNow } from "date-fns"

export const getRelativeTime = (createdAt) => {
  const timestamp = Number(createdAt)
  const date = isNaN(timestamp) ? null : new Date(timestamp)
  const relativeTime = date ? formatDistanceToNow(date, { addSuffix: true }) : ''
  return relativeTime
}