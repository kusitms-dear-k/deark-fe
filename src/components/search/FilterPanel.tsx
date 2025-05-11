
import { DropDownIcon } from '@/assets/svgComponents'
import Image from 'next/image'

const FilterPanel = () => {
  return (
    <section className={'flex w-full items-center gap-x-2 overflow-x-scroll py-3 pl-5'}>
      <button
        className={
          'flex h-fit items-center gap-x-[6px] rounded-[20px] border border-[var(--gray-200))] px-[13px] py-[5px] whitespace-nowrap'
        }
      >
        <div className={'relative h-[24px] w-[24px]'}>
          <Image className={'object-cover'} src={'/search/gray-calendar.svg'} alt={'캘린더'} fill />
        </div>
        <p className={'body-m text-[var(--gray-500)]'}>당일 주문</p>
      </button>
      <div className={'h-[24px] border-l border-[var(--gray-200)]'} />
      <button
        className={
          'flex h-fit items-center gap-x-[2px] rounded-[20px] border border-[var(--gray-200))] px-[12px] py-[5px] whitespace-nowrap'
        }
      >
        <p className={'body-m text-[var(--gray-500)]'}>위치</p>
        <div className={'relative h-[20px] w-[20px]'}>
          <DropDownIcon className="object-cover" />
        </div>
      </button>
      <button
        className={
          'flex h-fit items-center gap-x-[2px] rounded-[20px] border border-[var(--gray-200))] px-[12px] py-[5px] whitespace-nowrap'
        }
      >
        <p className={'body-m text-[var(--gray-500)]'}>날짜</p>
        <div className={'relative h-[20px] w-[20px]'}>
          <DropDownIcon className="object-cover" width="100%" height="100%" />
        </div>
      </button>
      <button
        className={
          'flex h-fit items-center gap-x-[2px] rounded-[20px] border border-[var(--gray-200))] px-[12px] py-[5px] whitespace-nowrap'
        }
      >
        <p className={'body-m text-[var(--gray-500)]'}>가격대</p>
        <div className={'relative h-[20px] w-[20px]'}>
          <DropDownIcon className="object-cover" width="100%" height="100%" />
        </div>
      </button>
      <button
        className={
          'flex h-fit items-center gap-x-[6px] rounded-[20px] border border-[var(--gray-200))] px-[12px] py-[5px] whitespace-nowrap'
        }
      >
        <p className={'body-m text-[var(--gray-500)]'}>24시 무인가게</p>
        <div className={'relative h-[20px] w-[20px]'}>
          <Image className={'object-cover'} src={'/search/clock.svg'} fill alt={'arrow'} />
        </div>
      </button>
      <button
        className={
          'flex h-fit items-center gap-x-[6px] rounded-[20px] border border-[var(--gray-200))] px-[12px] py-[5px] whitespace-nowrap'
        }
      >
        <p className={'body-m text-[var(--gray-500)]'}>도시락 케이크</p>
        <div className={'relative h-[20px] w-[20px]'}>
          <Image className={'object-cover'} fill src={'/search/cake.svg'} alt={'arrow'} />
        </div>
      </button>
    </section>
  )
}
export default FilterPanel
