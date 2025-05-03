import Image from 'next/image';

const SortFilterContent = () => {
  return (
    <>
      <button className="body-l flex items-center justify-between border-b border-[var(--gray-200)] py-[10px]">
        정확도
        <div className="relative h-[10px] w-[14px]">
          <Image src="/search/blue-check.svg" alt="check" fill className="object-cover" />
        </div>
      </button>
      <button
        className="body-l flex justify-between border-b border-[var(--gray-200)] py-[10px] text-[var(--gray-400)]">
        최신순
      </button>
      <button
        className="body-l flex justify-between border-b border-[var(--gray-200)] py-[10px] text-[var(--gray-400)]">
        인기순
      </button>
    </>
  )
}
export default SortFilterContent
