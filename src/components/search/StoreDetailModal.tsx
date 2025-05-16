import { useState } from 'react'

import StoreProfile from '@/components/search/StoreProfile'
import StoreDetailMenu from '@/components/search/StoreDetailMenu'
import StoreInfo from '@/components/search/StoreInfo'
import StoreDesign from '@/components/search/StoreDesign'
import StoreReview from '@/components/search/StoreReview'

const StoreDetailModal = () => {
  const [storeDetailMenu, setStoreDetailMenu] = useState<'가게 정보' | '디자인' | '리뷰'>('가게 정보')

  const renderContent = (storeDetailMenu: '가게 정보' | '디자인' | '리뷰') => {
    switch (storeDetailMenu) {
      case '리뷰':
        return <StoreReview />
      case '디자인':
        return <StoreDesign />
      default:
        return <StoreInfo />
    }
  }

  return (
    <div className={'fixed inset-0 z-50 flex min-h-screen flex-col gap-y-2 bg-[rgba(0,0,0,0.6)]'}>
      <div
        className={
          'absolute bottom-0 flex w-full flex-col items-center justify-center rounded-t-[16px] bg-[var(--white)] py-[20px]'
        }
      >
        <div className={'h-[3px] w-[27px] rounded-full bg-[var(--gray-200)]'} />
        <StoreProfile />
        <StoreDetailMenu storeDetailMenu={storeDetailMenu} setStoreDetailMenu={setStoreDetailMenu} />
        {renderContent(storeDetailMenu)}
        <div className={'bottom-0 w-full border-t border-[var(--gray-150)] bg-[var(--white)] px-5 pt-5'}>
          <button className={'button-l w-full rounded-[4px] bg-[var(--blue-400)] py-3 text-[var(--white)]'}>
            주문하러 가기
          </button>
        </div>
      </div>
    </div>
  )
}
export default StoreDetailModal
