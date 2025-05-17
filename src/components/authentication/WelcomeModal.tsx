import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

interface Props {
  onClick: () => void
}
const WelcomeModal = (props: Props) => {
  const {onClick} = props
  return (
    <div onClick={onClick} className={'fixed flex items-center justify-center inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute flex flex-col w-[320px] items-center justify-center rounded-[8px] bg-white py-[30px] px-[20px]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="flex flex-col gap-y-[20px]">
          <div className="relative mt-[1.25rem] flex w-full flex-col items-center">
            <Image src="/search/cracker-group.svg" alt="폭죽" width={244} height={84} className="absolute" />
            <div className="relative h-[72px] w-[72px]">
              <Image src={'/landing/cake.svg'} alt={'케이크'} fill className="object-cover" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="headline-s text-gray-900">회원가입이 완료되었어요 🎉</p>
            <p className="text-gray-500 body-m">디어케이와 함께 예쁜 추억을 쌓아봐요.</p>
          </div>
        </div>
      </motion.div>
    </div>
  )

}
export default WelcomeModal
