import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

interface PaymentCompleteModalProps {
  onClick: () => void
}

const PaymentCompleteModal = ({onClick}: PaymentCompleteModalProps) => {
  return (
    <div onClick={onClick}
         className={'fixed flex items-center justify-center inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute flex flex-col w-[320px] items-center justify-center rounded-[8px] bg-white py-[30px] px-[20px]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="flex flex-col gap-y-[24px]">
          <div className="relative flex w-full flex-col items-center">
            <Image src="/search/cracker-group.svg" alt="폭죽" width={244} height={84} className="absolute" />
            <div className="relative h-[72px] w-[72px]">
              <Image src={'/common/flying-money-icon.svg'} alt={'돈'} fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-y-1 items-center justify-center">
            <p className="headline-s text-gray-900">입금이 완료되었어요!</p>
            <p className="text-gray-500 body-m text-center">메이커께서 주문을 확정하면 <br />
              ‘픽업 확정'에서 제작 과정을 확인할 수 있어요</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default PaymentCompleteModal
