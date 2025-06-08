import { motion } from 'framer-motion'
import React from 'react'
import { useRouter } from 'next/navigation'
import { CancelIcon, KakaoIcon } from '@/assets/svgComponents'
import NavBar from '@/components/common/NavBar'
interface RequireLoginModalProps {
  onClick: () => void
  title?: string
  onCancelClick?: () => void
}

const RequireLoginModal = ({ onClick, title = '마이페이지', onCancelClick }: RequireLoginModalProps) => {
  const router = useRouter()
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
      }}
      className={
        'fixed inset-0 z-60 flex min-h-screen flex-col items-center justify-center gap-y-2 bg-[rgba(0,0,0,0.6)]'
      }
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="fixed right-5 left-5  pointer-events-auto"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <section className="mt-[30px] flex flex-col items-center justify-center rounded-t-[8px] bg-white">
          {onCancelClick && (
            <div className="flex w-full justify-end p-4">
              <CancelIcon
                onClick={() => {
                  onCancelClick()
                }}
                width={24}
                height={24}
                className="cursor-pointer"
              />
            </div>
          )}
          <div className={`${onCancelClick ? '' : 'mt-[30px]'} mb-[16px] flex flex-col items-center justify-center gap-y-1`}>
            <h2 className="title-l text-gray-900">{title}는 로그인 후 이용이 가능해요.</h2>
            <p className="body-s text-gray-500">30초만에 로그인하고 계속해볼까요?</p>
          </div>
        </section>
        <button
          onClick={() => {
            onClick()
            router.push('/login')
          }}
          className="button-m flex h-[42px] w-full items-center justify-center gap-x-2 rounded-b-[8px] bg-[#FADD0E] text-gray-900"
        >
          <KakaoIcon width={19} height={17} />
          카카오톡으로 쉬운 시작
        </button>
      </motion.div>
      {!onCancelClick && <NavBar />}
    </div>
  )
}
export default RequireLoginModal
