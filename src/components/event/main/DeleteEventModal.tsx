import { TrashAlertIcon } from '@/assets/svgComponents'

interface DeleteEventModalProps {
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteEventModal({ onClose, onConfirm }: DeleteEventModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[20rem] rounded-lg bg-white p-6 text-center">
        <div className="mb-4 flex justify-center">
          <TrashAlertIcon width={40} height={40} />
        </div>
        <h2 className="headline-s text-gray-900">이벤트 폴더를 삭제할까요?</h2>
        <p className="body-m mb-6 text-gray-600">삭제된 이벤트는 복구가 어려워요</p>

        <div className="flex gap-2">
          <button className="button-l flex-1 rounded-md bg-gray-200 py-3" onClick={onClose}>
            취소
          </button>
          <button className="button-l flex-1 rounded-md bg-blue-400 py-3 text-white" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
