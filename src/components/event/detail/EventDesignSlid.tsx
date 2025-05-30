'use client'

import { useState } from 'react'
import { DesignItem } from '@/types/event'
import Image from 'next/image'
import { HeartIconFill } from '@/assets/svgComponents'
import { EventApi } from '@/api/eventAPI'
import { useRouter } from 'next/navigation'

interface DesignCarouselProps {
  designs: DesignItem[]
  eventId: number
  onRemove: (designId: number) => void
}

export default function DesignCarousel({ designs, eventId, onRemove }: DesignCarouselProps) {
  // 각 디자인별 메모 상태를 따로 관리 (designId를 key로)
  const [memoMap, setMemoMap] = useState<{ [designId: number]: string }>({})

  const router = useRouter()

  // 메모 저장 API 호출
  const handleMemoBlur = async (designId: number) => {
    try {
      const memo = memoMap[designId] ?? ''
      await EventApi.updateDesignMemo(eventId, designId, memo)
      // 저장 후, 필요하다면 피드백/알림 처리
    } catch (e) {
      console.error('design slid error', e)
    }
  }

  if (!designs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <span className="mb-2 text-gray-500">아직 저장된 디자인이 없어요.</span>
        <button className="rounded bg-gray-100 px-4 py-2 font-medium text-gray-700">디자인 탐색</button>
      </div>
    )
  }

  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
      {designs.map((design) => {
        const memo = memoMap[design.designId] ?? ''
        const maxLen = 20

        return (
          <div
            key={design.designId}
            className="flex w-[140px] flex-none flex-col items-start gap-2 rounded border border-gray-100 bg-white p-2 shadow"
          >
            <div
              className="relative mx-auto h-[112px] w-[120px]"
              onClick={() => router.push(`/design/${design.designId}`)}
            >
              <Image src={design.designImageUrl} alt={design.designName} fill className="rounded object-cover" />
              <div className="absolute top-2 right-2" onClick={() => onRemove(design.designId)}>
                <HeartIconFill width={20} height={20} className="text-red-500" />
              </div>
            </div>
            <div className="flex w-[96px] flex-col gap-0.5">
              <div className="text-xs font-bold text-zinc-900">{design.designName}</div>
              <div className="text-[10px] text-neutral-500">{design.storeName}</div>
            </div>
            <div className="relative h-[2.75rem] w-[7.5rem] rounded-sm bg-stone-50 p-1.5 text-xs text-neutral-500">
              {/* 메모가 이미 있으면 텍스트로, 없으면 입력창 */}
              {design.memo ? (
                <span>{design.memo}</span>
              ) : (
                <>
                  <input
                    className="caption-m w-full bg-transparent text-[#707070] outline-none placeholder:text-stone-300"
                    placeholder="메모를 입력해주세요..."
                    maxLength={maxLen}
                    value={memo}
                    onChange={(e) => {
                      const val = e.target.value.slice(0, maxLen)
                      setMemoMap((prev) => ({ ...prev, [design.designId]: val }))
                    }}
                    onBlur={() => handleMemoBlur(design.designId)}
                  />
                  <span className="caption-m absolute right-2 bottom-1 text-[13px] font-medium text-stone-300">
                    {memo.length}/{maxLen}
                  </span>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
