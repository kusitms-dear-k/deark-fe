import Image from 'next/image';

const DesignCard = () => {
  return (
    <div className={'w-full'}>
      <div className={'relative h-[194px] w-full'}>
        <Image src={'/search/cake_img.png'} alt={'arrow'} fill className={'object-cover'} />
        <div className={'absolute bottom-[8px] flex w-full justify-between pr-[12px] pl-[8px]'}>
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

          <div className={'relative h-[24px] w-[24px]'}>
            <Image className={'bottom-0 object-cover'} src={'/common/heart_icon.svg'} fill alt={'heart'} />
          </div>
        </div>
      </div>

      <section className={'flex flex-col gap-y-1 px-[10px] py-[6px]'}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'flex gap-x-1 items-center'}>
            <div className={'caption-m text-[var(--gray-900)]'}>무무 케이크</div>
            <div className={'relative h-[6px] w-[3px]'}>
              <Image className={'object-cover'} src={'/search/right-arrow.svg'} fill alt={'arrow'} />
            </div>
          </div>

          <div className={'body-m text-[var(--gray-800)]'}>심플감성 스타일 레터링케이크</div>
        </div>
        <div>
          <div className={'title-l text-[var(--gray-900)]'}>
            18000<span className={'body-s'}>원~</span>
          </div>
        </div>
        <section className={'flex gap-x-[4px]'}>
          <div className={'flex items-center gap-x-[2px]'}>
            <div className={'relative h-[12px] w-[12px]'}>
              <Image className={'object-cover'} src={'/search/gray-fill-heart.svg'} fill alt={'heart'} />
            </div>
            <div className={'caption-m text-[var(--gray-400)]'}>1,452</div>
          </div>

          <div className={'caption-m text-[var(--gray-400)]'}>· 서울 흥길구 흥석동</div>
        </section>
      </section>
    </div>
  );
};
export default DesignCard;
