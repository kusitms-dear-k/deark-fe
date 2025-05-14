'use client'
import Header from '@/components/common/Header'
import OrderCard from '@/components/mypage/OrderCard'
import { useState } from 'react'
import OrderMenu from '@/components/mypage/OrderMenu'

const OrderInquiryPage = () => {
  const [orderMenu, setOrderMenu] = useState<'응답 대기' | '수락' | '반려'>('응답 대기')

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header
        fixed={false}
        headerType="DYNAMIC"
        title="제작 문의"
        className="top-20 items-start"
        description={'주문한 요청들을 확인해 보세요.'}
      />
      <OrderMenu orderMenu={orderMenu} setOrderMenu={setOrderMenu} />

      <section className={'w-full'}>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </section>
    </main>
  )
}
export default OrderInquiryPage
