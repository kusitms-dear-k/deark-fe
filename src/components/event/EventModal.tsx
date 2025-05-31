'use client'

interface EventModalProps {
  isOpenModal: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const EventModal = ({ isOpenModal, onClose, children, title }: EventModalProps) => {
  if (!isOpenModal) return null

  return (
    <div className="fixed inset-0 z-200 flex flex-col bg-black/50" onClick={onClose}>
      <div
        className="absolute bottom-0 left-0 flex min-h-[30rem] w-full flex-col gap-2.5 rounded-t-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mt-2.5 h-0.5 w-[1.625rem] rounded-full bg-gray-200" />

        {title && (
          <h2 className="title-xl flex h-[3.125rem] w-full items-center justify-center text-center">{title}</h2>
        )}

        {title === '' && (
          <h2 className="body-l-1 flex h-[2.125rem] w-full items-center justify-center text-center">새 이벤트 추가</h2>
        )}

        <div>{children}</div>
      </div>
    </div>
  )
}

export default EventModal
