'use client'

import { useState } from 'react'
import { StoreItem } from '@/types/event'
import Image from 'next/image'
import { HeartIconFill } from '@/assets/svgComponents'
import { EventApi } from '@/api/eventAPI'
import { useRouter } from 'next/navigation'

interface EventDetailStoreCardProps {
  store: StoreItem
  eventId: number
  onRemove: (storeId: number) => void
}

export default function EventDetailStoreCard({ store, eventId, onRemove }: EventDetailStoreCardProps) {
  const [memo, setMemo] = useState(store.memo ?? '')
  const [isSaving, setIsSaving] = useState(false)
  const maxLen = 20

  const router = useRouter()

  const handleMemoBlur = async () => {
    setIsSaving(true)
    try {
      await EventApi.updateStoreMemo(eventId, store.storeId, memo)
    } catch (e) {
      // 에러 처리
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-2.5 rounded border border-gray-100 bg-white p-2.5 shadow">
      <div className="flex items-center justify-between" onClick={() => router.push(`/store/${store.storeId}`)}>
        <div className="flex items-center gap-3">
          <Image src={store.designImageUrls[0]} alt={store.storeName} width={36} height={36} className="rounded-full" />
          <div>
            <div className="title-m text-gray-900">{store.storeName}</div>
            <div className="body-s-m text-gray-700">{store.storeAddress}</div>
          </div>
        </div>
        <HeartIconFill width={24} height={24} className="text-red-500" onClick={() => onRemove(store.storeId)} />
      </div>
      {/* 대표 이미지 최대 4장 */}
      <div className="flex gap-1">
        {store.designImageUrls.slice(0, 4).map((url, i) => (
          <Image key={i} src={url} alt={store.storeName} width={81} height={82} className="rounded-sm" />
        ))}
      </div>
      {/* 메모 */}
      <div className="caption-m relative rounded-sm bg-stone-50 p-2 text-neutral-500">
        <input
          className="w-full bg-transparent text-gray-500 outline-none placeholder:text-stone-300"
          placeholder="메모를 입력해주세요..."
          maxLength={maxLen}
          value={memo}
          onChange={(e) => setMemo(e.target.value.slice(0, maxLen))}
          onBlur={handleMemoBlur}
          disabled={isSaving}
        />
        <span className="absolute right-2 bottom-1 text-gray-300">
          {memo.length}/{maxLen}
        </span>
      </div>
    </div>
  )
}
