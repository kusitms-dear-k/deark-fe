'use client'

interface MiddleModalProps {
  isOpenModal: boolean
  onClose: () => void
  children: React.ReactNode
}

const MiddleModal = ({ isOpenModal, onClose, children }: MiddleModalProps) => {
  if (!isOpenModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="relative h-[8.563rem] w-80 rounded-xl bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation}>
        {children}
      </div>
    </div>
  )
}

export default MiddleModal
