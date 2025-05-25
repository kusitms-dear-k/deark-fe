import EditPencilIcon from '@/assets/svgComponents/EditPencilIcon'
import TrashIcon from '@/assets/svgComponents/TrashIcon'
import { EventDetail } from '@/types/event'
import Image from 'next/image'

interface EventActionSheetProps {
  event: EventDetail
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function EventActionSheet({ event, onClose, onEdit, onDelete }: EventActionSheetProps) {
  const formattedDate = event.eventDate ? event.eventDate.replace(/-/g, '.') : ''

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={onClose}>
      <div className="w-full rounded-t-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mt-3 h-0.5 w-[1.625rem] rounded-full bg-gray-200" />

        <div className="mx-auto mb-3 w-[21.875rem] border-b border-zinc-100 py-3">
          <div className="flex items-center gap-3">
            {/* 썸네일 이미지 */}
            {event.thumbnailUrl && (
              <div className="relative h-12 w-12 overflow-hidden rounded">
                <Image src={event.thumbnailUrl} alt={event.title} fill className="object-cover" />
              </div>
            )}

            {/* 이벤트 정보 */}
            <div className="flex flex-col gap-0.5">
              <div className="title-l text-gray-900">{event.title}</div>
              <div className="flex items-center gap-1">
                <span className="body-s text-gray-400">{formattedDate}</span>
                {event.address && (
                  <>
                    <div className="h-2 w-0.5 bg-gray-300"></div>
                    <span className="body-s max-w-[200px] truncate text-gray-400">{event.address}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <button className="mx-auto flex h-[3rem] w-[21.875rem] items-center gap-2 py-3 text-left" onClick={onDelete}>
          <TrashIcon width={24} height={24} />
          <span className="body-m-m">이벤트 삭제하기</span>
        </button>
        <button className="mx-auto mb-4 flex h-[3rem] w-[21.875rem] items-center gap-2 py-3 text-left" onClick={onEdit}>
          <EditPencilIcon width={24} height={24} />
          <span className="body-m-m">이벤트 수정하기</span>
        </button>
        <button
          className="button-m mx-auto flex h-[3.125rem] w-[21.875rem] items-center justify-center rounded-sm bg-gray-200 text-center"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  )
}
