import Image from 'next/image';

const StoreProfile = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <section className="flex w-full justify-end gap-x-1 px-[23px] pt-5">
        <div className="relative h-[24px] w-[24px]">
          <Image src="/common/gray_heart.svg" alt="하트" fill className="object-cover" />
        </div>
        <p className="body-m text-[var(--gray-700)]">1.9천</p>
      </section>
      <p>메리고라운드</p>
      <div className="mt-1 flex gap-x-[5px]">
        <div className="relative h-[22px] w-[22px]">
          <Image src="/search/location.svg" alt="장소" fill className="object-cover"></Image>
        </div>
        <p className="body-m text-[var(--gray-700)]">서울시 마포구 연남동</p>
      </div>

      <div className={'relative mt-5 flex w-full flex-col items-center'}>
        <Image src="/search/cracker-group.svg" alt="폭죽" width={244} height={84} className="absolute"></Image>
        <div className="relative h-[80px] w-[80px] rounded-full border border-[var(--blue-400)]">
          <Image src="/search/cake_img.png" alt="케이크" fill className="rounded-full object-cover"></Image>
        </div>
      </div>
    </div>
  );
};
export default StoreProfile;
