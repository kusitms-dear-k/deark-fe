import MemoSearchIcon from '@/assets/svgComponents/MemoSearchIcon'
import { motion } from 'framer-motion'
import React from 'react'

interface NotFormValidModalProps {
  onClick: () => void
}


const NotFormValidModal = ({ onClick }: NotFormValidModalProps) => {
  return (
    <div
      onClick={onClick}
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: '100%' }}
        className="absolute right-5 left-5"
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <section className="flex flex-col items-center justify-center rounded-t-[8px] bg-white px-4 pt-4">
          <MemoSearchIcon width={40} height={40} />
          <div className="mt-4 mb-5 flex flex-col items-center justify-center gap-y-1">
            <h2 className="headline-s text-gray-900">작성하지 않은 답변이 있어요!</h2>
            <p className="body-m text-gray-600">필수 답변을 모두 작성해주세요.</p>
          </div>
        </section>
        <section className="flex">
          <button
            onClick={onClick}
            className="button-l flex flex-1 items-center justify-center rounded-bl-[8px] bg-gray-200 text-gray-700"
          >
            취소
          </button>
          <button
            onClick={onClick}
            className="button-l rounded-t-0 flex w-full flex-1 items-center justify-center rounded-br-[8px] bg-blue-400 py-3 text-white"
          >
            확인
          </button>
        </section>
      </motion.div>
    </div>
  )
}
export default NotFormValidModal
