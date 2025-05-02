import Image from 'next/image';

const FilterPanel = () => {
  return (
    <section className={'flex gap-x-2 overflow-x-scroll w-full py-3 pl-5 items-center'}>
      <button
        className={
          ' flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] h-fit py-[5px] px-[13px]'
        }>
        <div className={'relative w-[24px] h-[24px]'}>
          <Image
            className={'object-cover'}
            src={'/search/gray-calendar.svg'}
            alt={'캘린더'}
            fill
          />
        </div>
        <p className={'body-m text-[var(--gray-500)]'}>당일 주문</p>
      </button>
      <div className={'h-[24px] border-l border-[var(--gray-200)]'}/>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit '
        }>
        <p className={'body-m text-[var(--gray-500)]'}>
          위치
        </p>
       <div className={'relative w-[20px] h-[20px]'}>
         <Image
           fill
           className={'object-cover'}
           src={'/common/drop_down.svg'}
           alt={'arrow'}
         />
       </div>
      </button>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>날짜</p>
        <div className={'relative w-[20px] h-[20px]'}>
          <Image
            fill
            className={'object-cover'}
            src={'/common/drop_down.svg'}
            alt={'arrow'}
          />
        </div>
      </button>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>가격대</p>
        <div className={'relative w-[20px] h-[20px]'}>
          <Image
            src={'/common/drop_down.svg'}
            fill
            alt={'arrow'}
            className={'object-cover'}
          />
        </div>
      </button>
      <button
        className={
          'flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>24시 무인가게</p>
        <div className={'relative w-[20px] h-[20px]'}>
          <Image
            className={'object-cover'}
            src={'/search/clock.svg'}
            fill
            alt={'arrow'}
          />
        </div>
      </button>
      <button
        className={
          'flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>도시락 케이크</p>
        <div className={'relative w-[20px] h-[20px]'}>
          <Image
            className={'object-cover'}
            fill
            src={'/search/cake.svg'}
            alt={'arrow'}
          />
        </div>
      </button>
    </section>
  );
};
export default FilterPanel;
