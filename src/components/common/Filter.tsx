const Filter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <div className={'absolute bottom-0 min-h-[326px] w-full rounded-t-[16px] bg-[var(--white)] py-[20px]'}>
        {children}
      </div>
    </div>
  )
}
export default Filter

const Menu = ({} : {}) => {
  return (
    <div className={'flex justify-between items-center px-5 pb-4 border-b border-[var(--gray-150)]'}>
      <div className={'flex gap-x-[24px] items-center'}>
        <button className={'text-[var(--black)]'}>위치</button>
        <button className={'text-[var(--gray-300)]'}>날짜</button>
        <button className={'text-[var(--gray-300)]'}>가격대</button>
      </div>

      <div className={'relative h-[24px] w-[24px]'}>
        <Image src={'/cancel.svg'} alt={'삭제'} className={'object-cover'} fill/>
      </div>
    </div>
  );
};

const BottomButton = ({} : {}) => {
  return (
    <div className="flex gap-x-[8px] pt-5 px-5 pb-[8px] border-t border-[var(--gray-150)]">
      <button className="py-[12px] px-[28px] bg-[var(--gray-200)] button-l rounded-[4px] w-[116px]">초기화</button>
      <button className="py-[12px] w-full rounded-[4px] bg-[var(--blue-400)] text-[var(--white)] button-l">{34}개 결과보기</button>
    </div>
  )
}

Filter.Menu = Menu;
Filter.BottomButton = BottomButton;
