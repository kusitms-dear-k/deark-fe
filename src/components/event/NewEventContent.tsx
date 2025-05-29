'use client'

import { HeartIconEmpty, MarkerPinIcon, SimpleCalendarIcon } from '@/assets/svgComponents'
import Image from 'next/image'
import EventButtons from './EventButtons'

interface NewEventContentProps {
  event: { name: string; date: string; location: string }
  setEvent: React.Dispatch<React.SetStateAction<{ name: string; date: string; location: string }>>
  onDateSelect: () => void
  onLocationSelect: () => void
  onSave: () => void
  onCancel: () => void
}

const NewEventContent = ({
  event,
  setEvent,
  onDateSelect,
  onLocationSelect,
  onSave,
  onCancel,
}: NewEventContentProps) => {
  return (
    <div className="body-m flex w-full flex-col items-center gap-3.5">
      <div className="mb-[1.375rem] flex flex-col items-center gap-2">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-400 bg-gray-100">
          <Image src="/search/cake_img.png" fill alt="사진" className="rounded-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="title-m text-gray-700">
          이벤트 이름 <span className="body-m-m text-gray-500">(15자 이내)</span>{' '}
          <span className="text-red-500">*</span>
        </label>
        <div className="flex h-[3.125rem] w-[20.375rem] items-center justify-between rounded-sm border border-gray-200 px-4">
          <input
            type="text"
            placeholder="지영이네 집들이 파티"
            className="caret-blue-400 outline-none"
            maxLength={15}
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
          />
          <HeartIconEmpty width={24} height={24} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="title-m text-gray-700">이벤트 날짜</label>
        <button
          className="flex h-[3.125rem] w-[20.375rem] items-center justify-between rounded-sm border border-gray-200 px-4"
          onClick={onDateSelect}
        >
          <span className={`${event.date ? 'text-gray-900' : 'text-gray-400'}`}>
            {event.date || '날짜를 선택하세요'}
          </span>
          <SimpleCalendarIcon width={24} height={24} />
        </button>
      </div>

      {/* <div className="flex flex-col gap-1">
        <label className="title-m text-gray-700">이벤트 장소</label>
        <button
          className="flex h-[3.125rem] w-[20.375rem] items-center justify-between rounded-sm border border-gray-200 px-4"
          onClick={onLocationSelect}
        >
          <span className={`${event.date ? 'text-gray-900' : 'text-gray-400'}`}>
            {event.location || '장소를 선택하세요'}
          </span>
          <MarkerPinIcon width={24} height={24} />
        </button>
      </div> */}

      <hr className="w-full border-t border-gray-200" />
      <EventButtons onCancel={onCancel} onClickActiveBtn={onSave} eventValue={event.name} activeBtnText="저장하기" />
    </div>
  )
}

export default NewEventContent
