import TrashAlertIcon from '@/assets/svgComponents/TrashAlertIcon'

interface DeleteEventModalProps {
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteEventModal({ onClose, onConfirm }: DeleteEventModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[22rem] rounded-lg bg-white pt-8 text-center">
        <div className="mb-4 flex justify-center">
          <TrashAlertIcon width={40} height={40} />
        </div>
        <h2 className="headline-s mb-1 text-gray-900">정말 삭제하시겠어요?</h2>
        <p className="body-m mb-6 text-gray-600">삭제된 폴더는 복구가 어려워요</p>

        {/* 버튼을 flex로 감싸고, 각각 w-1/2로 50%씩 */}
        <div className="flex w-full">
          <button
            className="button-l w-1/2 rounded-br-none rounded-bl-lg border-r border-gray-100 bg-gray-200 py-3 font-semibold text-gray-900"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="button-l w-1/2 rounded-br-lg rounded-bl-none bg-blue-400 py-3 font-semibold text-white"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
