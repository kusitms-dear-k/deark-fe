import Image from 'next/image';

const PriceFilterContent = () => {
  return (
    <>
      <button className="flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="body-l text-[var(--gray-700)]">전체</p>
      </button>
      <button className="flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="body-l text-[var(--gray-700)]">15,000원 이하</p>
      </button>
      <button className="flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="body-l text-[var(--gray-700)]">15,000원 ~ 20,000원</p>
      </button>
      <button className="flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="body-l text-[var(--gray-700)]">20,000원 ~ 30,000원</p>
      </button>
      <button className="flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="title-l text-[var(--gray-700)]">30,000원 ~ 40,000원</p>
      </button>
      <button className="mb-[10px] flex items-center gap-x-[10px] px-6 py-[10px]">
        <div className="relative h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--blue-400)]">
          <Image src="/search/white-check.svg" fill className="object-cover" alt="check" />
        </div>
        <p className="body-l text-[var(--gray-700)]">40,000원 이상</p>
      </button>
    </>
  )
}
export default PriceFilterContent
