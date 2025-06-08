import { motion } from 'framer-motion';
import { CancelIcon, LeftArrowIcon } from '@/assets/svgComponents';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useOrderStore } from '@/store/orderStore';
import { getMyEventDesignForUT } from '@/api/mypageAPI';
import { ResponseType } from '@/types/common';
import { UTEventDesignType, UTEventType } from '@/types/mypage';

interface Props {
  onClick: () => void;
  setIsEventFilterOpen: Dispatch<SetStateAction<boolean>>;
}

const UTEventDesignModal = (props: Props) => {
  const {onClick, setIsEventFilterOpen} = props
  const eventId = useOrderStore((state) =>state.selectedEventId)
  const requestDetailDesignId = useOrderStore((state) =>state.requestDetailDesignId)
  const eventTitle = useOrderStore((state) =>state.selectedEventTitle)
  const setState = useOrderStore((state) =>state.setState)

  const [designId, setDesignId] = useState<null | number>(null)
  const [designImageUrl, setDesignImageUrl] = useState<null | string>(null)

  const [eventDesigns, setEventDesigns] = useState<UTEventDesignType[]>()

  useEffect(() => {
    // 1. 초기 상태 실행
    if (eventId) {
      getMyEventDesignForUT(eventId)
        .then((res: ResponseType<UTEventDesignType[]>) => {
          setEventDesigns(res.results)
          console.log('이벤트 디자인 전체 조회', res)
        })
        .catch(console.error)
    }
  }, [])

  useEffect(() => {
    console.log('eventId', eventId)
  }, [eventId]);

  return (
    <div onClick={onClick} className={'fixed inset-0 z-60 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[16px] bg-[var(--white)] py-[20px]"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className={'h-[3px] w-[27px] rounded-full bg-[var(--gray-200)]'} />
        <div className="flex w-full flex-col">
          <div className="body-l-m relative mt-[10px] flex w-full items-center justify-center px-5 py-1">
            <p>디자인 선택</p>
            <CancelIcon onClick={onClick} className={'absolute right-5'} width={24} height={24} />
          </div>
          <div className={'my-[10px]'}>
            <div>
              <div className="flex items-start gap-x-1">
                <LeftArrowIcon
                  width={24}
                  height={24}
                  className="mt-1 cursor-pointer"
                  onClick={() => {
                    onClick()
                    setIsEventFilterOpen(true)
                  }}
                />
                <div>
                  <p className="title-xl text-gray-900">{eventTitle}</p>
                  <p className="caption-l text-gray-900">저장된 디자인 {36}개</p>
                </div>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-3 gap-[2px]">
            {eventDesigns?.map((eventDesign) => {
              return (
                <div
                  key={eventDesign.designId}
                  onClick={() => {
                    setDesignId(eventDesign.designId)
                    setDesignImageUrl(eventDesign.designImageUrl)
                  }}
                >
                  {eventDesign.designId === designId ? (
                    <div className={"z-10 absolute bg-black opacity-40 w-[128] h-[128]"}></div>
                  ) : null}
                  <div className={"relative w-[128px] h-[128px]"}>
                    <Image key={eventDesign.designId} alt={'이미지'} className="object-cover" fill src={eventDesign.designImageUrl} />
                  </div>
                </div>
              )
            })}
          </section>

        </div>
        <div className="border-gray-150 flex w-full gap-x-[0.5rem] border-t px-[1.25rem] pt-[1.25rem] pb-[0.5rem]">
          <button
            onClick={() => {
              setDesignId(null)
              setDesignImageUrl(null)
              setState({
                selectedEventId: null,
                selectedEventTitle: null,
              })
              onClick()
            }}
            className="button-l w-[7.125rem] rounded-[0.25rem] bg-gray-200 px-[1.75rem] py-[0.75rem]">
            초기화
          </button>
          <button
            onClick={() => {
              setState({
                requestDetailDesignId: designId,
                selectedRequestDetailDesignUrl: designImageUrl,
              })
              onClick()
            }}
            className="button-l w-full rounded-[0.25rem] bg-blue-400 py-[0.75rem] text-white">선택완료</button>
        </div>
      </motion.div>
    </div>
  )
}
export default UTEventDesignModal;
