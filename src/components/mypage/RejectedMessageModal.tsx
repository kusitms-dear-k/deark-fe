import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { CancelIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import { getAcceptedOrderDetailData, getMyOrder, getMyOrderRequestCount, getRejectedMessage } from '@/api/mypageAPI'
import { ResponseType } from '@/types/common'
import { AcceptedOrderDetailType, OrderType, RequestCountType } from '@/types/mypage'
import { useOrderStore } from '@/store/orderStore'

interface RejectedMessageModalProps {
  onClick: () => void
}

const RejectedMessageModal = ({ onClick }: RejectedMessageModalProps) => {
  const router = useRouter()
  const messageId = useOrderStore((state) => state.messageId)
  const [rejectedMessage, setRejectedMessage] = useState<string>()

  useEffect(() => {
    // 1. 초기 상태 실행
    getRejectedMessage(messageId)
      .then((res: ResponseType<{ reason: string }>) => {
        console.log('거절 메시지:', res.results.reason)
        setRejectedMessage(res.results.reason)
      })
      .catch(console.error)
    // 2. 이후 상태 변화 감지
    const unsubscribe = useOrderStore.subscribe((currentStatus, prevState) => {
      //승인된 주문서 디테일 데이터
      getRejectedMessage(messageId)
        .then((res: ResponseType<{ reason: string }>) => {
          console.log('거절 메시지:', res.results.reason)
          setRejectedMessage(res.results.reason)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [])

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
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className="flex flex-col items-center justify-center rounded-t-[8px] bg-white px-[20px] pt-4 pb-5">
          <div className="flex w-full justify-end">
            <CancelIcon width={24} height={24} onClick={onClick} />
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-1">
            <div className="relative h-[40px] w-[40px]">
              <Image src={'/person-rejected.svg'} alt={'거절'} fill className="object-cover" />
            </div>
            <p className="title-l text-center text-gray-900">
              주문이 반려됐어요. <br />
              다른 스토어를 찾아볼까요?
            </p>
            <div className="bg-gray-150 body-m-m flex w-full items-center justify-center rounded-[4px] py-[11px] text-gray-600">
              사유 : {rejectedMessage}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            router.push('/')
            onClick()
          }}
          className="title-l w-full rounded-b-[8px] bg-blue-400 py-3 text-white"
        >
          다른 가게 둘러보기
        </button>
      </motion.div>
    </div>
  )
}
export default RejectedMessageModal
