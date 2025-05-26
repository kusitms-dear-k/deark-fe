import { motion } from 'framer-motion'
import React from 'react'

interface LogoutModalProps {
  onClick: () => void
  handleLogout: () => void
}

const LogoutModal = ({onClick, handleLogout}: LogoutModalProps) => {
  return (
    <div
      onClick={onClick}
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-5 left-5 "
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <section className="flex flex-col items-center justify-center rounded-t-[8px] bg-white">
          <div className="mt-[40px] mb-[32px] flex flex-col items-center justify-center gap-y-1">
            <h2 className="headline-s text-gray-900">로그아웃 하시겠어요?</h2>
          </div>
        </section>
        <section className="flex">
          <button
            onClick={onClick}
            className="flex flex-1 items-center justify-center bg-gray-200 text-gray-700 button-l rounded-bl-[8px]">취소
          </button>
          <button
            onClick={() => {
              handleLogout()
              onClick()
            }}
            className="flex flex-1 items-center justify-center py-3 bg-blue-400 text-white button-l w-full rounded-br-[8px] rounded-t-0">로그아웃
          </button>
        </section>
      </motion.div>
    </div>
  )
}
export default LogoutModal
