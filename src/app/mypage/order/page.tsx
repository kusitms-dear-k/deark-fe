'use client'
import Header from '@/components/common/Header'
import OrderMenu from '@/components/mypage/OrderMenu'
import { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import { getMyOrder, getMyOrderRequestCount } from '@/api/mypageAPI'
import OrderCard from '@/components/mypage/OrderCard'
import { ResponseType } from '@/types/common'
import { OrderType, RequestCountType } from '@/types/mypage'
import RequestModal from '@/components/alarm/RequestModal'
import Image from 'next/image'
import { CopyIcon, CreditCardCheckIcon } from '@/assets/svgComponents'
import Order from '@/components/order/Order'

const OrderInquiryPage = () => {
  const [orderList, setOrderList] = useState<OrderType[]>()
  const [requestCountList, setRequestCountList] = useState<RequestCountType[]>()
  const status = useOrderStore((state) => state.status)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState<boolean>(false)
  const isOrderOpen = useOrderStore((state) => state.isOrderOpen)
  const messageId = useOrderStore((state) => state.messageId)

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
    })

    return () => unsubscribe()
  }, [])

  return (
    isOrderOpen ? (<Order messageId={messageId} />) : (
      <main className="flex min-h-screen flex-col items-center">

        {isRequestModalOpen && (
          <RequestModal
            className=""
            bottomChildren={
              <div>
                <button className="flex h-[54px] w-full items-center justify-center gap-x-2 bg-gray-700">
                  <CopyIcon width={24} height={24} />
                  <p className={'button-l text-white'}>계좌번호 복사하기</p>
                </button>
                <button
                  className="flex h-[54px] w-full items-center justify-center gap-x-2 rounded-b-[8px] bg-blue-400">
                  <CreditCardCheckIcon width={24} height={24} />
                  <p className={'button-l text-white'}>입금을 완료했어요!</p>
                </button>
              </div>
            }
            onClick={() => setIsRequestModalOpen(!isRequestModalOpen)}
          >
            <>
              <section className="flex flex-col items-center justify-center gap-y-2">
                <div className="relative h-[40px] w-[40px]">
                  <Image src={'/person-approve.svg'} fill className="object-cover" alt="승인" />
                </div>
                <section className="flex flex-col gap-y-1">
                  <div className="title-l text-center">
                    주문이 수락됐어요! <br />
                    입금이 확인되면 제작이 시작돼요.
                  </div>
                  <div className="bg-gray-150 body-m-m w-full rounded-[4px] px-[30px] py-[11px] text-gray-600">
                    안녕하세요 고객님 문의주셔서 감사합니다. 해당 디자인으로 말씀하신 일정에 가능합니다! ’국민은행
                    123456-78-901234 홍길동’ 계좌번호로 입금해주시면 제작 확정됩니다 :)
                  </div>
                </section>
              </section>
            </>
          </RequestModal>
        )}
        <Header
          headerType="DYNAMIC"
          title="제작 문의"
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
                    setIsRequestModalOpen={setIsRequestModalOpen}
                    isRequestModalOpen={isRequestModalOpen}
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
  )
}
export default OrderInquiryPage
