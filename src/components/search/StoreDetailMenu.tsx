import { Dispatch, SetStateAction } from 'react';

interface Props {
  storeDetailMenu: '가게 정보' | '디자인' | '리뷰';
  setStoreDetailMenu: Dispatch<SetStateAction<'가게 정보' | '디자인' | '리뷰'>>;
}

const StoreDetailMenu = (props: Props) => {
  const {storeDetailMenu, setStoreDetailMenu} = props;
  return (
    <div className={'mt-4 flex w-full mt-[26px]'}>
      <button
        onClick={() => {
          setStoreDetailMenu('가게 정보')
        }}
        className={storeDetailMenu === '가게 정보'
          ? 'w-full title-l text-[var(--red-500)] h-[44px] border-b-[4px] border-[var(--red-500)]'
          : 'w-full body-l text-[var(--gray-300)] h-[44px] border-b-[4px] border-[var(--gray-300)]'
        }>
        가게 정보
      </button>
      <button
        onClick={() => {
          setStoreDetailMenu('디자인')
        }}
        className={storeDetailMenu === '디자인'
          ? 'w-full title-l text-[var(--red-500)] h-[44px] border-b-[4px] border-[var(--red-500)]'
          : 'w-full body-l text-[var(--gray-300)] h-[44px] border-b-[4px] border-[var(--gray-300)]'
        }>
        디자인
      </button>
      <button
        onClick={() => {
          setStoreDetailMenu('리뷰')
        }}
        className={storeDetailMenu === '리뷰'
          ? 'w-full title-l text-[var(--red-500)] h-[44px] border-b-[4px] border-[var(--red-500)]'
          : 'w-full body-l text-[var(--gray-300)] h-[44px] border-b-[4px] border-[var(--gray-300)]'
        }>
        리뷰
      </button>
    </div>
  )
}
export default StoreDetailMenu;
