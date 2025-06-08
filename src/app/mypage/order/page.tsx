'use client'
import Header from '@/components/common/Header'
import OrderMenu from '@/components/mypage/OrderMenu'
import React, { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import { getAcceptedOrderDetailData, getMyOrder, getMyOrderRequestCount, putRequestStatus } from '@/api/mypageAPI'
import OrderCard from '@/components/mypage/OrderCard'
import { ResponseType } from '@/types/common'
import { AcceptedOrderDetailType, OrderType, RequestCountType } from '@/types/mypage'
import RequestModal from '@/components/alarm/RequestModal'
import Image from 'next/image'
import { GrayCopyIcon } from '@/assets/svgComponents'
import Order from '@/components/order/Order'
import PaymentCompleteModal from '@/components/mypage/PaymentCompleteModal'
import CancelOrderConfirmModal from '@/components/mypage/CancelOrderConfirmModal'
import ToastMsg from '@/components/event/ToastMsg'
import RejectedMessageModal from '@/components/mypage/RejectedMessageModal'

const OrderInquiryPage = () => {
  const [orderList, setOrderList] = useState<OrderType[]>()
  const [requestCountList, setRequestCountList] = useState<RequestCountType[]>()
  const [acceptedOrderDetailData, setAcceptedOrderDetailData] = useState<AcceptedOrderDetailType>()
  const status = useOrderStore((state) => state.status)
  // 승인된 메시지 모달
  const [isAcceptedRequestModalOpen, setIsAcceptedRequestModalOpen] = useState<boolean>(false)
  // 반려된 메시지 모달
  const [isRejectedMessageModalOpen, setIsRejectedMessageModalOpen] = useState<boolean>(false)
  const isOrderOpen = useOrderStore((state) => state.isOrderOpen)
  const messageId = useOrderStore((state) => state.messageId)
  // 지불 완료된 메시지 모달
  const [isPaymentCompleteModalOpen, setIsPaymentCompleteModalOpen] = useState(false)
  // 주문 취소 확인 모달
  const [isCancelOrderConfirmModalOpen, setIsCancelOrderConfirmModalOpen] = useState(false)
  // ToastMessage 띄우는 모달
  const [isToastMessageOpen, setIsToastMessageOpen] = useState(false)

  useEffect(() => {
    // 1. 초기 상태 실행
    getMyOrder(status)
      .then((res: ResponseType<{ responseList: OrderType[] }>) => {
        setOrderList(res.results.responseList)
        console.log('마이페이지 초기 실행 결과:', res)
      })
      .catch(console.error)
    getMyOrderRequestCount()
      .then((res: ResponseType<{ responseList: RequestCountType[] }>) => {
        setRequestCountList(res.results.responseList)
        console.log('요청 개수:', res)
      })
      .catch(console.error)
    //승인된 주문서 디테일 데이터
    getAcceptedOrderDetailData(messageId)
      .then((res: ResponseType<AcceptedOrderDetailType>) => {
        console.log('승인된 주문서 디테일 데이터:', res)
        setAcceptedOrderDetailData(res.results)
      })
      .catch(console.error)
    // 2. 이후 상태 변화 감지
    const unsubscribe = useOrderStore.subscribe((currentStatus, prevState) => {
      getMyOrder(currentStatus.status)
        .then((res: ResponseType<{ responseList: OrderType[] }>) => {
          setOrderList(res.results.responseList)
          console.log('마이페이지 변경 후 결과:', res)
        })
        .catch(console.error)
      getMyOrderRequestCount()
        .then((res: ResponseType<{ responseList: RequestCountType[] }>) => {
          setRequestCountList(res.results.responseList)
          console.log('요청 개수:', res)
        })
        .catch(console.error)
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

  // 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isPaymentCompleteModalOpen) {
      const timer = setTimeout(() => {
        setIsPaymentCompleteModalOpen(false)
      }, 3000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isPaymentCompleteModalOpen])

  return isOrderOpen ? (
    <Order messageId={messageId} />
  ) : (
    <main className="flex min-h-screen flex-col items-center">
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
      <Header
        headerType="DYNAMIC"
        title="제작 문의"
        headerClassname="fixed"
        className="items-start pt-20 pb-3"
        description={'주문한 요청들을 확인해 보세요.'}
      />
      <section className="mt-16 w-full">
        <OrderMenu requestCountList={requestCountList} />

        <section className={'w-full'}>
          {orderList ? (
            orderList.map((order) => {
              return (
                <OrderCard
                  key={order.messageId}
                  status={status}
                  setIsAcceptedRequestModalOpen={setIsAcceptedRequestModalOpen}
                  setIsRejectedMessageModalOpen={setIsRejectedMessageModalOpen}
                  {...order}
                />
              )
            })
          ) : (
            //skeleton-ui
            <div></div>
          )}
        </section>
      </section>
    </main>
  )
}
export default OrderInquiryPage
