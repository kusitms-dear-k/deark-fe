import Image from 'next/image'

const Filter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'fixed inset-0 z-50 flex flex-col gap-y-2 bg-[rgba(0,0,0,0.6)] min-h-screen'}>
      <div className={'absolute w-full min-h-[326px] rounded-t-[16px] bg-[var(--white)] py-[20px] bottom-0'}>
        {children}
      </div>
    </div>
  )
}
export default Filter


const Menu = ({}: {}) => {
  return (
    <div className={'flex items-center justify-between border-b border-[var(--gray-150)] px-5 pb-4'}>
      <div className={'flex items-center gap-x-[24px]'}>
        <button className={'text-[var(--black)]'}>위치</button>
        <button className={'text-[var(--gray-300)]'}>날짜</button>
        <button className={'text-[var(--gray-300)]'}>가격대</button>
      </div>

      <div className={'relative h-[24px] w-[24px]'}>
        <Image src={'/cancel.svg'} alt={'삭제'} className={'object-cover'} fill />
      </div>
    </div>
  )
}

const BottomButton = ({}: {}) => {
  return (
    <div className="flex gap-x-[8px] border-t border-[var(--gray-150)] px-5 pt-5 pb-[8px]">
      <button className="button-l w-[116px] rounded-[4px] bg-[var(--gray-200)] px-[28px] py-[12px]">초기화</button>
      <button className="button-l w-full rounded-[4px] bg-[var(--blue-400)] py-[12px] text-[var(--white)]">
        {34}개 결과보기
      </button>
    </div>
  )
}

Filter.Menu = Menu
Filter.BottomButton = BottomButton
