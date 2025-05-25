import { motion } from 'framer-motion'
import React from 'react'
import { useOrderStore } from '@/store/orderStore'
import MemoSearchIcon from '@/assets/svgComponents/MemoSearchIcon'

interface SubmitConfirmationModalProps {
  onClick: () => void
}

const SubmitConfirmationModal = ({ onClick }: SubmitConfirmationModalProps) => {
  const setState = useOrderStore((state) => state.setState)

  return (
    <div
      onClick={onClick}
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-5 left-5"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <section className="flex flex-col items-center justify-center rounded-t-[8px] bg-white px-4 pt-4">
          <div className="flex items-center">
            <div className="flex gap-x-[6px]">
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-200"></div>
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-300"></div>
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-400"></div>
            </div>
            <MemoSearchIcon width={40} height={40} />
            <div className="flex gap-x-[6px]">
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-400"></div>
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-300"></div>
              <div className="h-[4.4px] w-[4.4px] rounded-full bg-blue-200"></div>
            </div>
          </div>

          <div className="mt-4 mb-5 flex flex-col items-center justify-center gap-y-1">
            <h2 className="headline-s text-gray-900">이대로 제작 요청이 전송돼요!</h2>
            <p className="body-m text-gray-600">옵션과 요청사항을 한 번 더 확인해주세요!</p>
          </div>
        </section>
        <section className="flex">
          <button
            type={'button'}
            onClick={onClick}
            className="button-l flex flex-1 items-center justify-center rounded-bl-[8px] bg-gray-200 text-gray-700"
          >
            다시 확인하기
          </button>
          <button
            type={'submit'}
            onClick={() => {
              onClick()
              setState({ isOrderFormOpen: false })
              setState({ isOrderSubmissionSuccessModalOpen: true })
            }}
            className="button-l rounded-t-0 flex w-full flex-1 items-center justify-center rounded-br-[8px] bg-blue-400 py-3 text-white"
          >
            전송하기
          </button>
        </section>
      </motion.div>
    </div>
  )
}
export default SubmitConfirmationModal
