import Image from 'next/image';

const SearchSummaryPanel = () => {
  return (
    <div className={'flex justify-between px-5 py-1 border-t border-[var(--gray-150)]'}>
      <div className={'caption-l text-[var(--gray-400)] py-[7px]'}>총 112개</div>
      <button className={'flex items-center body-s text-[var(--gray-900)] py-[6px] px-3'}>정확도순
        <Image
          src={'/common/fill_drop_down.svg'}
          width={20}
          height={20}
          alt={'arrow'}
          style={{ width: 20, height: 20 }}
        />
      </button>
    </div>
  );
};
export default SearchSummaryPanel;
