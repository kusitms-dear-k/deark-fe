import EditPencilIcon from '@/assets/svgComponents/EditPencilIcon'
import TrashIcon from '@/assets/svgComponents/TrashIcon'
import { EventDetail } from '@/types/event'

interface EventActionSheetProps {
  event: EventDetail
  onClose: () => void
  onEdit: () => void
  onDelete: () => void
}

export default function EventActionSheet({ event, onClose, onEdit, onDelete }: EventActionSheetProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={onClose}>
      <div className="w-full rounded-t-xl bg-white p-4" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto mb-3 w-[21.875rem] text-lg font-semibold">{event.title}</div>
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
