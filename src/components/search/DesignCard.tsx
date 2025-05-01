import Image from 'next/image';

const DesignCard = () => {
  return (
    <div className={'w-full'}>
      <div className={'relative'}>
        <div className={'relative h-[166px] w-[194px]'}>
          <Image src={'/search/cake_img.png'} alt={'arrow'} fill className={'object-cover'} />
        </div>
        <div className={'bottom-5 h-[22px] text-white bg-[var(--blue-400)] caption-m px-2 blue-400-button w-fit'}>당일 주문</div>

        <Image
          className={'absolute right-6 bottom-3'}
          src={'/common/heart_icon.svg'}
          width={24}
          height={24}
          alt={'heart'}
          style={{ width: 24, height: 24 }}
        />
      </div>
      <section className={'flex flex-col gap-y-1 px-[10px] py-[6px]'}>
        <div className={'flex flex-col gap-y-1'}>
          <div className={'caption-m text-[var(--gray-900)]'}>무무 케이크</div>
          <div className={'body-m text-[var(--gray-800)]'}>심플감성 스타일 레터링케이크</div>
        </div>
        <div>
          <div className={'title-l text-[var(--gray-900)]'}>
            18000<span className={'body-s'}>원~</span>
          </div>
        </div>
        <section className={'flex gap-x-[2px]'}>
          <div className={'caption-m text-[var(--gray-400)]'}>1,452</div>
          <div className={'caption-m text-[var(--gray-400)]'}>서울 흥길구 흥석동</div>
        </section>
      </section>
    </div>
  );
};
export default DesignCard;
