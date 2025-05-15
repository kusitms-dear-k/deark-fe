import { DropDownIcon } from '@/assets/svgComponents'
import Image from 'next/image'


const StoreCard = () => {
  return (
    <div className={'border-b border-[var(--gray-150)] pb-4'}>
      <section className={'flex items-center justify-between pr-5'}>
        <section className={'flex items-center gap-x-[12px]'}>

          <div className={'relative h-[58px] w-[58px]'}>
            <Image src={'/landing/cake_img.png'} alt={'cake'} className={'rounded-full object-cover'} fill />
          </div>
          <div>
            <p className={'title-l'}>버쓰데이연남</p>
            <div className={'flex gap-x-[6px]'}>
              <p className={'body-s'}>130m</p>
              <div className={'flex'}>
                <p className={'body-s'}>서울 홍길구 흑석동</p>
                <div className={'relative h-[20px] w-[20px]'}>
                  <DropDownIcon width="100%" height="100%" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={'flex flex-col items-center'}>
          <div className={'relative h-[24px] w-[24px]'}>
            <Image alt={'heart'} src={'/search/gray-heart.svg'} fill className={'object-cover'} />
          </div>
          <p className={'caption-m text-[var(--gray-400)]'}>1000</p>
        </section>
      </section>

      <section className={'mt-[12px] flex w-full gap-x-[2px] overflow-x-scroll'}>
        <div className={'relative h-[120px] w-[120px] flex-shrink-0'}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'relative h-[120px] w-[120px] flex-shrink-0'}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'relative h-[120px] w-[120px] flex-shrink-0'}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'relative h-[120px] w-[120px] flex-shrink-0'}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'relative h-[120px] w-[120px] flex-shrink-0'}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
      </section>

      <section className={'mt-[6px] flex gap-x-1'}>
        <div
          className={
            'z-20 flex h-[22px] w-fit items-center justify-center gap-x-1 rounded-[2px] bg-[var(--blue-400)] px-2 text-white'
          }
        >
          <div className={'relative h-[14px] w-[14px]'}>
            <Image className={'object-cover'} src={'/search/white-calendar.svg'} fill alt={'heart'} />
          </div>
          <p className={'caption-m'}>당일 주문</p>
        </div>
        <div className={'caption-l w-fit rounded-[2px] bg-[var(--gray-150)] px-[6px] py-[2px]'}>도시락 케이크</div>
      </section>
    </div>
  )
}
export default StoreCard
