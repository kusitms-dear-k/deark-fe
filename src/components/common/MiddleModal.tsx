'use client'

interface MiddleModalProps {
  isOpenModal: boolean
  onClose: () => void
  children: React.ReactNode
}

const MiddleModal = ({ isOpenModal, onClose, children }: MiddleModalProps) => {
  if (!isOpenModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="shadow-middlemodal relative h-[8.563rem] w-80 rounded-lg bg-white px-5 pt-[1.875rem] pb-0"
        onClick={(e) => e.stopPropagation}
      >
        {children}
      </div>
    </div>
  )
}

export default MiddleModal
