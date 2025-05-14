'use client'
import Header from '@/components/common/Header'
import OrderMenu from '@/components/mypage/OrderMenu'
import { useEffect } from 'react'
import { useOrderStore } from '@/store/orderStore'
import { myOrder } from '@/api/mypageAPI'
import OrderCard from '@/components/mypage/OrderCard'

const OrderInquiryPage = () => {
  const status = useOrderStore((state) => state.status)
  const orderData = useOrderStore((state) => state.orderData)

  useEffect(() => {
    // 1. 초기 상태 실행
    myOrder(status)
      .then((res) => {
        console.log('초기 실행 결과:', res)
      })
      .catch(console.error)

    // 2. 이후 상태 변화 감지
    const unsubscribe = useOrderStore.subscribe((currentStatus, prevState) => {
      myOrder(currentStatus.status)
        .then((res) => {
          console.log('변경 후 결과:', res)
        })
        .catch(console.error)
    })

    return () => unsubscribe()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        headerType="DYNAMIC"
        title="제작 문의"
        className="items-start pt-20 pb-3"
        description={'주문한 요청들을 확인해 보세요.'}
      />
      <section className="mt-16 w-full">
        <OrderMenu />

        <section className={'w-full'}>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </section>
      </section>
    </main>
  )
}
export default OrderInquiryPage
