import { motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getMyEventForUT, getOrderFormDesignData } from '@/api/mypageAPI'
import { ResponseType } from '@/types/common'
import { OrderFormDesignListType, UTEventType } from '@/types/mypage'
import Image from 'next/image';
import { CancelIcon } from '@/assets/svgComponents';
import { useOrderStore } from '@/store/orderStore';

interface Props {
  onClick: () => void
  setIsEventDesignFilterOpen: Dispatch<SetStateAction<boolean>>
}

const UTEventModal = (props: Props) => {
  const { onClick, setIsEventDesignFilterOpen } = props
  const [events, setEvents] = useState<UTEventType[]>()
  const setState = useOrderStore((state) => state.setState)

  useEffect(() => {
    // 1. 초기 상태 실행
    getMyEventForUT()
      .then((res: ResponseType<UTEventType[]>) => {
        setEvents(res.results)
        console.log('이벤트 전체 조회', res)
      })
      .catch(console.error)
  }, [])

  return (
    <div onClick={onClick} className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[16px] bg-[var(--white)] py-[20px]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className={'h-[3px] w-[27px] rounded-full bg-[var(--gray-200)]'} />
        <div className="flex flex-col w-full">
          <div className="relative mt-[10px] flex justify-center items-center w-full body-l-m py-1 px-5 ">
            <p>이벤트 선택</p>
            <CancelIcon onClick={onClick} className={'absolute right-5'} width={24} height={24}/>
          </div>
          <div className={'mt-3 '}>
            {events ? events.map((event) => {
              return (
                <div
                  key={event.eventId}
                  onClick={() => {
                    setState({selectedEventId: event.eventId, selectedEventTitle: event.title})
                    onClick()
                    setIsEventDesignFilterOpen(true)
                  }}
                  className={`flex justify-start gap-x-[13px] px-5 border-t border-gray-150 body-m-m text-gray-700 items-center justify-center w-full ${event.thumbnailUrl ? 'py-[10px]' : 'py-[17px]'}`}>
                  {event.thumbnailUrl ? (
                    <div className="relative w-[36px] h-[36px]">
                      <Image alt="이벤트" src={event.thumbnailUrl} className="object-cover rounded-full" fill/>
                    </div>
                  ) : null}
                  {event.title}
                </div>
              )
            }) : null}
          </div>
        </div>

        <div className="w-full border-gray-150 flex gap-x-[0.5rem] border-t px-[1.25rem] pt-[1.25rem] pb-[0.5rem]">
          <button className="button-l w-[7.125rem] rounded-[0.25rem] bg-gray-200 px-[1.75rem] py-[0.75rem]">
            초기화
          </button>
          <button className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white">선택완료</button>
        </div>
      </motion.div>
    </div>
  )
}
export default UTEventModal
