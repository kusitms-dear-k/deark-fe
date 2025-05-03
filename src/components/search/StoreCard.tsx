import Image from 'next/image';

const StoreCard = () => {
  return (
    <div className={'border-b border-[var(--gray-150)] pb-4'}>
      <section className={'flex justify-between items-center pr-5'}>
        <section className={'flex gap-x-[12px] items-center'}>
          <div className={'relative h-[58px] w-[58px]'}>
            <Image src={'/landing/cake_img.png'} alt={'cake'} className={'rounded-full object-cover'} fill />
          </div>
          <div>
            <p className={'title-l'}>버쓰데이연남</p>
            <div className={'flex gap-x-[6px]'}>
              <p className={'body-s'}>130m</p>
              <div className={'flex'}>
                <p className={'body-s'}>서울 홍길구 흑석동</p>
                <div className={'relative w-[20px] h-[20px]'}>
                  <Image
                    fill
                    className={'object-cover'}
                    src={'/common/drop_down.svg'}
                    alt={'arrow'}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={'flex flex-col items-center'}>
          <div className={'relative w-[24px] h-[24px]'}>
            <Image alt={'heart'} src={'/search/gray-heart.svg'} fill className={'object-cover'} />
          </div>
          <p className={'caption-m text-[var(--gray-400)]'}>1000</p>
        </section>
      </section>

      <section className={'flex gap-x-[2px] mt-[12px] w-full overflow-x-scroll'}>
        <div className={'flex-shrink-0 relative w-[120px] h-[120px] '}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'flex-shrink-0 relative w-[120px] h-[120px] '}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'flex-shrink-0 relative w-[120px] h-[120px] '}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'flex-shrink-0 relative w-[120px] h-[120px] '}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
        <div className={'flex-shrink-0 relative w-[120px] h-[120px] '}>
          <Image alt={'heart'} src={'/search/cake_img.png'} fill className={'object-cover'} />
        </div>
      </section>

      <section className={'flex gap-x-1 mt-[6px]'}>
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
        <div className={'bg-[var(--gray-150)] rounded-[2px] py-[2px] px-[6px] caption-l w-fit'}>도시락 케이크</div>
      </section>

    </div>
  );
}
export default StoreCard;
