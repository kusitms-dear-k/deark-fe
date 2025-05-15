import StoreCard from '@/components/search/StoreCard';
import EventModal from '@/components/event/EventModal';
import ToastMsg from '@/components/event/ToastMsg';
import MiddleModal from '@/components/common/MiddleModal';
import { KakaoIcon } from '@/assets/svgComponents';
import { useState } from 'react';

interface Props {

}

const StoreSearchResult = (props: Props) => {
  const [isLogin] = useState<boolean>(true)

  return (
    <>
      <section className={'flex flex-col gap-y-4 py-2 pl-5'}>
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
        <StoreCard />
      </section>
    </>
  )
}
export default StoreSearchResult
