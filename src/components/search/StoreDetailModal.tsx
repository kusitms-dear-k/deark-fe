import { useState } from 'react';

import StoreProfile from '@/components/search/StoreProfile';
import StoreDetailMenu from '@/components/search/StoreDetailMenu';
import StoreInfo from '@/components/search/StoreInfo';
import StoreDesign from '@/components/search/StoreDesign';
import StoreReview from '@/components/search/StoreReview';

const StoreDetailModal = () => {
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보');

  const renderContent = (storeDetailMenu: '가게 정보' | '디자인' | '리뷰') => {
    switch (storeDetailMenu) {
      case '리뷰':
        return <StoreReview />;
      case '디자인':
        return <StoreDesign />;
      default:
        return <StoreInfo />;
    }
  }

  return (
    <div className={'fixed inset-0 z-50 flex flex-col gap-y-2 bg-[rgba(0,0,0,0.6)] min-h-screen'}>
      <div className={'absolute flex flex-col items-center justify-center w-full rounded-t-[16px] bg-[var(--white)] py-[20px] bottom-0'}>
        <div className={'w-[27px] h-[3px] rounded-full bg-[var(--gray-200)]'} />
        <StoreProfile />
        <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
        {renderContent(storeDetailMenu)}
        <div className={'w-full bottom-0 pt-5 px-5 border-t border-[var(--gray-150)] bg-[var(--white)]'}>
          <button className={'w-full py-3 button-l text-[var(--white)] bg-[var(--blue-400)] rounded-[4px]'}>주문하러 가기</button>
        </div>
      </div>
    </div>
  )
}
export default StoreDetailModal;
