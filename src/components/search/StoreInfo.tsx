import Image from 'next/image';

const StoreInfo = () => {
  return (
    <div className={'flex w-full flex-col gap-y-[28px] px-5 pt-6'}>
      <section className={'flex flex-col gap-y-2'}>
        <p className="title-l">가게 소개</p>
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
          <div className={'caption-l w-fit rounded-[2px] bg-[var(--gray-150)] px-[6px] py-[2px]'}>24시 무인가게</div>
          <div className={'caption-l w-fit rounded-[2px] bg-[var(--gray-150)] px-[6px] py-[2px]'}>도시락 케이크</div>
        </section>
        <section className={'rounded-[4px] border border-[var(--gray-150)] p-4'}>
          <p className={'body-m text-[var(--gray-500)]'}>
            메리고라운드는 당신의 특별한 순간에 작은 설렘을 더하는 레터링케이크 가게입니다. 전하고 싶은 말을 케이크 위에
            담아, 사랑하는 사람에게, 혹은 수고한 나 자신에게 선물하세요.
          </p>
        </section>
      </section>
      <section className={'flex flex-col gap-y-[12px]'}>
        <div>
          <p className={'title-l'}>메리고라운드 2호점</p>
          <p className={'body-m text-[var(--gray-800)]'}>서울시 마포구 연남동 2층 203, 204호</p>
        </div>
        <div>
          <p className={'title-l'}>영업시간</p>
          <p className={'body-m text-[var(--gray-800)]'}>월요일 ~ 일요일 : 10:00~22:00</p>
        </div>
      </section>
    </div>
  );
};

export default StoreInfo;
