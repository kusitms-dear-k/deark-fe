'use client'
import { getPickupDoneData, getPickupExpectData } from '@/api/mypageAPI'
import Header from '@/components/common/Header'
import PickUpStatusCard from '@/components/mypage/PickUpStatusCard'
import { PickupOrder } from '@/types/mypage'
import { useEffect, useState } from 'react'
import { useOrderStore } from '@/store/orderStore'
import Order from '@/components/order/Order'

const ApprovePage = () => {
  const [pickupExpectList, setPickupExpectList] = useState<PickupOrder[]>([])
  const [pickupDoneList, setPickupDoneList] = useState<PickupOrder[]>([])
  const [pickupExpectTotal, setPickupExpectTotal] = useState<number>(0)
  const [pickupDoneTotal, setPickupDoneTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const isOrderOpen = useOrderStore((state) => state.isOrderOpen)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const [expectRes, doneRes] = await Promise.all([getPickupExpectData(), getPickupDoneData()])
      setPickupExpectList(expectRes.results?.responseList || [])
      setPickupExpectTotal(expectRes.results?.totalNum || 0)
      setPickupDoneList(doneRes.results?.responseList || [])
      setPickupDoneTotal(doneRes.results?.totalNum || 0)
      setLoading(false)
    }
    fetchData()
  }, [])

  // 최신 픽업일 순으로 정렬 (API에서 이미 정렬되어 있으면 생략 가능)
  const sortedPickupExpectList = [...pickupExpectList].sort(
    (a, b) =>
      new Date(b.pickupDate + ' ' + b.pickupTime).getTime() - new Date(a.pickupDate + ' ' + a.pickupTime).getTime()
  )
  const sortedPickupDoneList = [...pickupDoneList].sort(
    (a, b) =>
      new Date(b.pickupDate + ' ' + b.pickupTime).getTime() - new Date(a.pickupDate + ' ' + a.pickupTime).getTime()
  )

  return isOrderOpen ? (
    <Order />
  ) : (
    <main className="flex min-h-screen flex-col">
      <Header
        headerType="DYNAMIC"
        title="픽업 확정"
        headerClassname={'fixed bg-white '}
        className={'bg-white items-start pt-20 pb-3'}
        description={'곧 만날 케이크들이에요!'}
      />

      <section className="mt-[150px] flex flex-col gap-y-[1.5rem]">
        {/* 픽업 예정 */}
        <section className="px-[1.25rem]">
          <h2 className="title-l p-[0.5rem]">
            픽업 예정 <span className="text-blue-400">{pickupExpectTotal}건</span>
          </h2>
          <section className="flex flex-col gap-y-[1rem]">
            {loading ? (
              <div>불러오는 중...</div>
            ) : sortedPickupExpectList.length === 0 ? (
              <div>픽업 예정 주문이 없습니다.</div>
            ) : (
              sortedPickupExpectList.map((order) => <PickUpStatusCard key={order.messageId} {...order} />)
            )}
          </section>
        </section>
        <div className="h-2 w-full bg-stone-50" />
        {/* 픽업 완료 */}
        <section className="px-[1.25rem]">
          <h2 className="title-l p-[0.5rem]">
            픽업 완료 <span className="text-blue-400">{pickupDoneTotal}건</span>
          </h2>
          <section className="flex flex-col gap-y-[1rem]">
            {loading ? (
              <div>불러오는 중...</div>
            ) : sortedPickupDoneList.length === 0 ? (
              <div>픽업 완료 주문이 없습니다.</div>
            ) : (
              sortedPickupDoneList.map((order) => <PickUpStatusCard key={order.messageId} {...order} />)
            )}
          </section>
        </section>
      </section>
    </main>
  )
}
export default ApprovePage
