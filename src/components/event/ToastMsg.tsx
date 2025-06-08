'use client'

import { useEffect } from 'react'

interface ToastMsgProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

const ToastMsg = ({ message, isVisible, onClose, duration = 2000 }: ToastMsgProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed right-0 bottom-16 left-0 z-50 flex justify-center">
      <div className="body-l-1 w-4/5 rounded-md bg-gray-800 px-4 py-3 text-center text-white shadow-lg">{message}</div>
    </div>
  )
}

export default ToastMsg
