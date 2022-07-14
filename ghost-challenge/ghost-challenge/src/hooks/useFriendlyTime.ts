import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"

export const useFriendlyTime = (timestamp: number) => {
  const [state, setState] = useState(formatDistanceToNow(timestamp, { addSuffix: true }))
  
  useEffect(() => {
    const interval = setInterval(() => {
      setState(formatDistanceToNow(timestamp, { addSuffix: true }))
    }, 1000)
    return () => clearInterval(interval)
  }, [timestamp])

  return state
}
