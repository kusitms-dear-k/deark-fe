import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface OrderExitConfirmModalProps {
  onClick: () => void
  onExit: () => void
}

const OrderExitConfirmModal = ({onClick, onExit}: OrderExitConfirmModalProps) => {
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
          <div
            className="relative mt-[30px] h-[50px] w-[50px]"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
              maskImage: 'linear-gradient(to right, black 20%, transparent 100%)',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <Image src={'/landing/cake.svg'} alt={'케이크'} fill className="object-cover" />
          </div>

          <div className="mt-4 mb-5 flex flex-col items-center justify-center gap-y-1">
            <h2 className="headline-s text-gray-900">주문 내용이 사라져요!</h2>
            <p className="body-m text-gray-600 text-center">이 페이지를 나가면 작성한 내용이 사라져요. <br/>
              정말 나가시겠어요?</p>
          </div>
        </section>
        <section className="flex">
          <button
            onClick={() => {
              onClick()
              onExit()
            }}
            className="button-l flex flex-1 items-center justify-center rounded-bl-[8px] bg-gray-200 text-gray-700"
          >
            나가기
          </button>
          <button
            onClick={async () => {
              onClick()
            }}
            className="button-l rounded-t-0 flex w-full flex-1 items-center justify-center rounded-br-[8px] bg-blue-400 py-3 text-white"
          >
            이어서 작성하기
          </button>
        </section>
      </motion.div>
    </div>
  )
}
export default OrderExitConfirmModal
