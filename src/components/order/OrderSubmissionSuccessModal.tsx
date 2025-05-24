import { motion } from 'framer-motion'
import { MemoSearchIcon } from '@/assets/svgComponents'
import React from 'react'
import Image from 'next/image'

interface OrderSubmissionSuccessModalProps {
  onClick?: () => void
}

const OrderSubmissionSuccessModal = ({onClick}: OrderSubmissionSuccessModalProps) => {
  return (
    <div
      onClick={onClick}
      className={
        'fixed inset-0 z-50 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute flex flex-col w-[320px] items-center justify-center rounded-[8px] bg-white py-[30px] px-[20px]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="flex flex-col gap-y-[20px]">
          <div className="relative mt-[1.25rem] flex w-full flex-col items-center">
            <Image src="/search/cracker-group.svg" alt="폭죽" width={244} height={84} className="absolute" />
            <div className="relative h-[72px] w-[72px]">
              <Image src={'/landing/cake.svg'} alt={'케이크'} fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col gap-y-[20px]">
            <div className="flex flex-col gap-y-1 items-center">
              <p className="headline-s text-gray-900">문의가 완료되었어요!</p>
              <p className="text-gray-500 body-m">메이커의 대답이 오면 알려드릴게요.</p>
            </div>
            <p className={"text-gray-400 caption-l text-center"}>답변은 홈 상단의 “종 아이콘” or <br />
              “마이페이지 → 제작 문의”에서 확인하실 수 있어요!</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
export default OrderSubmissionSuccessModal
