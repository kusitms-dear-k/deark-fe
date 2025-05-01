import Image from 'next/image';

const FilterPanel = () => {
  return (
    <section className={'flex gap-x-2 overflow-x-scroll w-full py-3 pl-5 items-center'}>
      <button
        className={
          'flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <Image
          src={'/search/calendar-check-01.svg'}
          width={24}
          height={24}
          alt={'캘린더'}
          style={{ width: 24, height: 24 }}
        />
        <div className={'body-m text-[var(--gray-500)]'}>당일 주문</div>
      </button>
      <div className={'h-[24px] border-l border-[var(--gray-200)]'}/>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <div className={'body-m text-[var(--gray-500)]'}>위치</div>
        <Image
          src={'/common/drop_down.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>날짜</p>
        <Image
          src={'/common/drop_down.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
      <button
        className={
          'flex gap-x-[2px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>가격대</p>
        <Image
          src={'/common/drop_down.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
      <button
        className={
          'flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <p className={'body-m text-[var(--gray-500)]'}>24시 무인가게</p>
        <Image
          src={'/search/clock.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
      <button
        className={
          'flex gap-x-[6px] items-center whitespace-nowrap rounded-[20px] border border-[var(--gray-200))] py-[5px] px-[12px] h-fit'
        }>
        <div className={'body-m text-[var(--gray-500)]'}>도시락 케이크</div>
        <Image
          src={'/search/cake.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
    </section>
  );
};
export default FilterPanel;
