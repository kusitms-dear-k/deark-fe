import { BluePlusIcon } from '@/assets/svgComponents'

interface AddEventBtnProps {
  className?: string
  onClick: () => void
}

const AddEventBtn = ({ onClick, className }: AddEventBtnProps) => {
  return (
    <button
      className={`${className} button-m flex h-[2.625rem] w-[21.875rem] items-center justify-center gap-2 rounded-sm border border-blue-400 text-blue-400`}
      onClick={onClick}
    >
      <BluePlusIcon width={20} height={20} className="cursor-pointer" />새 이벤트 추가
    </button>
  )
}

export default AddEventBtn
