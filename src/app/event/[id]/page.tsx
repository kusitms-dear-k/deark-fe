'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { EventApi } from '@/api/eventAPI'
import { DesignItem, EventDetail, StoreItem } from '@/types/event'
import HeaderWithBack from '@/components/common/HeaderWithBack'
import EventHeader from '@/components/event/detail/EventHeader'
import DesignCarousel from '@/components/event/detail/EventDesignSlid'
import EventDetailStoreCard from '@/components/event/detail/EventDetailStore'
import EmptySection from '@/components/event/detail/EvmptySection'

export default function EventDetailPage() {
  const params = useParams()
  const eventId = Array.isArray(params.id) ? Number(params.id[0]) : Number(params.id)

  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null)
  const [designs, setDesigns] = useState<DesignItem[]>([])
  const [stores, setStores] = useState<StoreItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true)
        const event = await EventApi.getEvent(eventId)
        setEventDetail(event)
        const [designsData, storesData] = await Promise.all([
          EventApi.getEventDesigns(eventId),
          EventApi.getEventStores(eventId),
        ])
        setDesigns(designsData)
        setStores(storesData)
      } catch (err: any) {
        setError(err.message || '데이터를 불러오는 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    }
    fetchEventData()
  }, [eventId])

  if (loading) return <div className="flex h-screen items-center justify-center">로딩 중...</div>
  if (error) return <div className="mt-10 text-center text-red-500">{error}</div>
  if (!eventDetail) return <div className="mt-10 text-center">이벤트를 찾을 수 없습니다.</div>

  return (
    <div className="min-h-screen overflow-y-auto bg-white pb-26">
      <HeaderWithBack headerText={eventDetail.title} />
      <EventHeader event={eventDetail} />

      {/* 디자인 섹션 */}
      <section className="mx-auto mt-4 w-[21.875rem]">
        <div className="mb-2 text-base font-bold text-zinc-800">디자인</div>
        {designs.length > 0 ? (
          <DesignCarousel designs={designs} eventId={eventDetail.eventId} />
        ) : (
          <EmptySection
            title="아직 저장된 디자인이 없어요."
            description="새로운 디자인을 찾아볼까요?"
            buttonText="디자인 둘러보러 가기"
            pathname="/search?tab=design"
          />
        )}
      </section>

      <div className="my-4 h-2 w-full self-stretch bg-stone-50" />

      {/* 스토어 섹션 */}
      <section className="mx-auto mb-6 w-[21.875rem]">
        <div className="mb-2 text-base font-bold text-zinc-800">스토어</div>
        {stores.length > 0 ? (
          <div className="flex flex-col gap-4">
            {stores.map((store) => (
              <EventDetailStoreCard key={store.storeId} store={store} eventId={eventDetail.eventId} />
            ))}
          </div>
        ) : (
          <EmptySection
            title="아직 저장된 스토어가 없어요."
            description="새로운 스토어를 찾아볼까요?"
            buttonText="스토어 둘러보러 가기"
            pathname="/search?tab=store"
          />
        )}
      </section>
    </div>
  )
}
