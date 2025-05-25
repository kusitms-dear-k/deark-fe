'use client'

import { Switch } from '@/components/ui/switch'

import Header from '@/components/common/Header'
import NoticeCard from '@/components/notice/NoticeCard'
import UnCheckBoxIcon from '@/assets/svgComponents/UnCheckBoxIcon'
import React, { useEffect, useState } from 'react'
import { ResponseType } from '@/types/common'
import { deleteNotices, getNotices } from '@/api/noticeAPI'
import { NoticeType } from '@/types/notice'
import { AcceptedOrderDetailType, OrderMenuType } from '@/types/mypage'
import CheckBoxIcon from '@/assets/svgComponents/CheckBoxIcon'
import { useOrderStore } from '@/store/orderStore'
import Order from '@/components/order/Order'
import RejectedMessageModal from '@/components/mypage/RejectedMessageModal'
import PaymentCompleteModal from '@/components/mypage/PaymentCompleteModal'
import CancelOrderConfirmModal from '@/components/mypage/CancelOrderConfirmModal'
import RequestModal from '@/components/alarm/RequestModal'
import { getAcceptedOrderDetailData, putRequestStatus } from '@/api/mypageAPI'
import Image from 'next/image'
import { GrayCopyIcon } from '@/assets/svgComponents'
import ToastMsg from '@/components/event/ToastMsg'

const NoticePage = () => {
  const [noticeData, setNoticeData] = useState<NoticeType>()
  const [orderStatus, setOrderStatus] = useState<OrderMenuType | null>(null)
  const [deleteAlarmIdList, setDeleteAlarmIdList] = useState<number[]>([])
  const [readAlarmIdList, setReadAlarmIdList] = useState<number[]>([])
  const isOrderOpen = useOrderStore((state) => state.isOrderOpen)
  const messageId = useOrderStore((state) => state.messageId)
  
  //모달
  const [acceptedOrderDetailData, setAcceptedOrderDetailData] = useState<AcceptedOrderDetailType>()
  // 승인된 메시지 모달
  const [isAcceptedRequestModalOpen, setIsAcceptedRequestModalOpen] = useState<boolean>(false)
  // 반려된 메시지 모달
  const [isRejectedMessageModalOpen, setIsRejectedMessageModalOpen] = useState<boolean>(false)
  // 지불 완료된 메시지 모달
  const [isPaymentCompleteModalOpen, setIsPaymentCompleteModalOpen] = useState(false)
  // 주문 취소 확인 모달
  const [isCancelOrderConfirmModalOpen, setIsCancelOrderConfirmModalOpen] = useState(false)
  // ToastMessage 띄우는 모달
  const [isToastMessageOpen, setIsToastMessageOpen] = useState(false)

  useEffect(() => {
    //승인된 주문서 디테일 데이터
    getAcceptedOrderDetailData(messageId)
      .then((res: ResponseType<AcceptedOrderDetailType>) => {
        console.log('승인된 주문서 디테일 데이터:', res)
        setAcceptedOrderDetailData(res.results)
      })
      .catch(console.error)
    // 2. 이후 상태 변화 감지
    const unsubscribe = useOrderStore.subscribe((currentStatus, prevState) => {
      //승인된 주문서 디테일 데이터
      getAcceptedOrderDetailData(messageId)
        .then((res: ResponseType<AcceptedOrderDetailType>) => {
          console.log('승인된 주문서 디테일 데이터:', res)
          setAcceptedOrderDetailData(res.results)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (typeof orderStatus !== 'string' && orderStatus !== null) return
    getNotices(orderStatus)
      .then((res: ResponseType<NoticeType>) => {
        console.log('알람 데이터', res)
        setNoticeData(res.results)
      })
      .catch(console.error)
  }, [orderStatus])

  const allAlarmIds = noticeData?.responseList.map((notice) => notice.alarmId) ?? []
  const isAllSelected = allAlarmIds.length > 0 && allAlarmIds.every((id) => deleteAlarmIdList.includes(id))

  /**
   * 삭제 요청 api 함수
   * @param deleteAlarmIdList 삭제 리스트 함수
   */
  const handleDeleteNotice = async (deleteAlarmIdList: number[]) => {
    try {
      const res = await deleteNotices(deleteAlarmIdList)
      console.log(res)

      // ⬇ 삭제한 ID들 상태에서도 제거
      setDeleteAlarmIdList((prev) => prev.filter((id) => !deleteAlarmIdList.includes(id)))

      const noticeRes = await getNotices(orderStatus)
      console.log('알람 데이터', noticeRes)
      setNoticeData(noticeRes.results)
    } catch (error) {
      console.error(error)
    }
  }

  // 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isPaymentCompleteModalOpen) {
      const timer = setTimeout(() => {
        setIsPaymentCompleteModalOpen(false)
      }, 2000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isPaymentCompleteModalOpen])

  return isOrderOpen ? (
    <Order messageId={messageId} />
  ) : (
    <main className="flex min-h-screen flex-col w-full">
      {isRejectedMessageModalOpen && <RejectedMessageModal onClick={() => setIsRejectedMessageModalOpen(false)} />}
      {isPaymentCompleteModalOpen && <PaymentCompleteModal onClick={() => setIsPaymentCompleteModalOpen(false)} />}
      {isCancelOrderConfirmModalOpen && (
        <CancelOrderConfirmModal
          onClick={() => setIsCancelOrderConfirmModalOpen(false)}
          setIsRequestModalOpen={setIsAcceptedRequestModalOpen}
        />
      )}
      {isAcceptedRequestModalOpen && (
        <RequestModal
          className=""
          bottomChildren={
            <div>
              <section className="flex">
                <button
                  onClick={() => {
                    setIsCancelOrderConfirmModalOpen(true)
                    setIsAcceptedRequestModalOpen(false)
                  }}
                  className="button-l flex flex-1 items-center justify-center rounded-bl-[8px] bg-gray-200 text-gray-700"
                >
                  주문 취소
                </button>
                <button
                  onClick={async () => {
                    await putRequestStatus(messageId, 'PAID').then(() => {
                      setIsPaymentCompleteModalOpen(true)
                      setIsAcceptedRequestModalOpen(false)
                    })
                  }}
                  className="button-l rounded-t-0 flex w-full flex-1 items-center justify-center rounded-br-[8px] bg-blue-400 py-3 text-white"
                >
                  입금 완료
                </button>
              </section>
            </div>
          }
          onClick={() => setIsAcceptedRequestModalOpen(!isAcceptedRequestModalOpen)}
        >
          <>
            <section className="flex w-full flex-col items-center justify-center gap-y-2">
              <div className="relative h-[40px] w-[40px]">
                <Image src={'/person-approve.svg'} fill className="object-cover" alt="승인" />
              </div>
              <section className="flex w-full flex-col gap-y-1">
                <div className="title-l text-center">
                  주문이 수락됐어요! <br />
                  입금이 확인되면 제작이 시작돼요.
                </div>
                <div className="bg-gray-150 body-m-m flex w-full flex-col items-center justify-center gap-y-1 rounded-[4px] px-[20px] py-[9px] text-gray-900">
                  <p>픽업 시간: {acceptedOrderDetailData?.pickUpTime}</p>
                  {acceptedOrderDetailData?.price !== undefined && (
                    <p>최종 금액: {Number(acceptedOrderDetailData.price).toLocaleString()}원</p>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-[4px] border border-gray-200 px-5 py-[10px]">
                  <div className="flex items-center">
                    <div className="relative h-[32px] w-[32px] rounded-full">
                      <Image
                        src={acceptedOrderDetailData?.bankImageUrl ? acceptedOrderDetailData?.bankImageUrl : ''}
                        alt="계좌"
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-2 flex gap-x-2">
                      <p className="title-m text-gray-800">{acceptedOrderDetailData?.bankName}</p>
                      <p className="body-m ml-2 text-gray-800">{acceptedOrderDetailData?.account}</p>
                    </div>
                  </div>
                  <GrayCopyIcon
                    onClick={() => {
                      setIsToastMessageOpen(!isToastMessageOpen)
                      if (acceptedOrderDetailData) {
                        navigator.clipboard.writeText(
                          `${acceptedOrderDetailData?.bankName} ${acceptedOrderDetailData.account}`
                        )
                      }
                    }}
                    width={24}
                    height={24}
                  />
                </div>
              </section>
            </section>
            <ToastMsg
              onClose={() => setIsToastMessageOpen(!isToastMessageOpen)}
              isVisible={isToastMessageOpen}
              message={'계좌번호가 복사되었어요.'}
              duration={2000}
            />
          </>
        </RequestModal>
      )}

      <Header headerType={'DYNAMIC'} title={'알림'} headerClassname={'fixed bg-white'} />
      <div className="h-[80px]" />

      {noticeData && noticeData.responseList.length > 0 && (
        <section className="flex flex-col gap-y-[6px] px-5 pt-[32.5px] w-full ">
          <div className="flex gap-x-[5px]">
            <Switch
              checked={orderStatus === 'ACCEPTED'}
              onCheckedChange={(checked) => {
                setOrderStatus(checked ? 'ACCEPTED' : null)
              }}
            />
            <p className="body-m-m text-gray-700">수락된 건만 보기</p>
          </div>
          <div className="border-gray-150 flex justify-between border-b py-2">
            <div className="flex gap-x-1">
              {isAllSelected ? (
                <CheckBoxIcon onClick={() => setDeleteAlarmIdList([])} width={24} height={24} />
              ) : (
                <UnCheckBoxIcon onClick={() => setDeleteAlarmIdList(allAlarmIds)} width={24} height={24} />
              )}
              <p className="body-m text-gray-500">
                전체선택({deleteAlarmIdList.length}/{noticeData?.alarmCount})
              </p>
            </div>
            <button
              onClick={() =>
                handleDeleteNotice(deleteAlarmIdList).then((r) => {
                  console.log('r', r)
                })
              }
              className="body-m text-gray-500"
            >
              선택삭제
            </button>
          </div>
        </section>
      )}

      <section className="flex flex-1 flex-col w-full items-center justify-center w-full">
        {noticeData ? (
          noticeData.responseList.length > 0 ? (
            noticeData.responseList.map((notice, index) => {
              return (
                <NoticeCard
                  isLastIndex={index === noticeData.responseList.length - 1}
                  key={notice.alarmId}
                  {...notice}
                  deleteAlarmIdList={deleteAlarmIdList}
                  totalOrderStatus={orderStatus}
                  setNoticeData={setNoticeData}
                  setDeleteAlarmIdList={setDeleteAlarmIdList}
                  readAlarmIdList={readAlarmIdList}
                  setReadAlarmIdList={setReadAlarmIdList}
                  setIsRejectedMessageModalOpen={setIsRejectedMessageModalOpen}
                  setIsAcceptedRequestModalOpen={setIsAcceptedRequestModalOpen}
                />
              )
            })
          ) : (
            //noticeData 의 List 가 빈 경우
            <section className="flex h-full flex-col items-center justify-center gap-y-[0.938rem]">
              <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} />
              <div className="flex flex-col items-center justify-center text-center">
                <div className="title-l text-gray-500">새로운 소식이 없어요</div>
                <div className="body-m text-gray-400">오늘의 소식이 생기면 알려드릴게요 :)</div>
              </div>
            </section>
          )
        ) : (
          //TODO: skeleton-ui
          <div></div>
        )}
      </section>
    </main>
  )
}
export default NoticePage
