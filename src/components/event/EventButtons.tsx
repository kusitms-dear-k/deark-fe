interface EventButtonProps {
  onCancel: () => void
  onClickActiveBtn: () => void
  eventValue: string | Date | undefined
  activeBtnText: string
}

const EventButtons = ({ onCancel, onClickActiveBtn, eventValue, activeBtnText }: EventButtonProps) => {
  return (
    <div className="mt-5 mb-5 flex h-[5.625rem] items-center gap-2">
      <button
        className="button-l flex h-[3.125rem] w-[7.25rem] items-center justify-center rounded-sm bg-gray-200"
        onClick={onCancel}
      >
        이전으로
      </button>
      <button
        className={`button-l flex h-[3.125rem] w-[14.125rem] items-center justify-center rounded-sm text-white ${eventValue ? 'cursor-pointer bg-blue-400' : 'bg-blue-200'} `}
        onClick={onClickActiveBtn}
        disabled={!eventValue}
      >
        {activeBtnText}
      </button>
    </div>
  )
}

export default EventButtons
