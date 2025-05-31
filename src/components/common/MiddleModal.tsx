'use client'

interface MiddleModalProps {
  isOpenModal: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  preventCloseOnOutsideClick?: boolean
}

const MiddleModal = ({
  isOpenModal,
  onClose,
  children,
  className,
  preventCloseOnOutsideClick = false,
}: MiddleModalProps) => {
  if (!isOpenModal) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={() => {
        if (!preventCloseOnOutsideClick) onClose() // 조건 추가
      }}
    >
      <div
        className={`shadow-middlemodal relative h-[8.563rem] w-[90vw] rounded-lg bg-white px-5 pt-[1.875rem] pb-0 ${className}`}
        onClick={(e) => e.stopPropagation()} // 수정: 함수 호출 형태로 변경
      >
        {children}
      </div>
    </div>
  )
}

export default MiddleModal
