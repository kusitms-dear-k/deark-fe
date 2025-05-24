'use client'

import { HeartIconEmpty, HeartIconFill, PlusIcon } from '@/assets/svgComponents'
import Image from 'next/image'

interface EventSelectionContentProps {
  events: { id: number; name: string; icon: string; isLiked: boolean }[]
  onSelect: (eventId: number) => void
  onAddNew: () => void
}

const EventSelectionContent = ({ events, onSelect, onAddNew }: EventSelectionContentProps) => {
  return (
    <div className="divide-y divide-gray-100">
      <button
        className="border-b-gray-150 flex h-14 w-full items-center gap-3 border-b-1 px-3 hover:bg-gray-200"
        onClick={onAddNew}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
          <PlusIcon width={18} height={18} />
        </div>
        <span className="body-l-1">새 이벤트 추가</span>
      </button>

      {events.map((event) => (
        <button
          key={event.id}
          className="border-b-gray-150 flex h-14 w-full items-center justify-between border-b-1 px-3 hover:bg-gray-200"
          onClick={() => onSelect(event.id)}
        >
          <div className="body-l-1 flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-200">
              <Image src={event.icon ?? '/search/cake_img.png'} width={32} height={32} alt="" />
            </div>
            <span className={event.id === 2 ? 'font-bold' : ''}>{event.name}</span>
          </div>
          <span>
            {event.isLiked ? <HeartIconFill width={24} height={24} /> : <HeartIconEmpty width={24} height={24} />}
          </span>
        </button>
      ))}
    </div>
  )
}

export default EventSelectionContent
