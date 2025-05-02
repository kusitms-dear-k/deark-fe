import DesignCard from '@/components/search/DesignCard';
import StoreCard from '@/components/search/StoreCard';
import Image from 'next/image';
import RecommendCard from '@/components/search/RecommendCard';
interface Props {
  searchMenu: '디자인' | '스토어';
}

const DesignSearchResult = (props: Props) => {
  const {searchMenu} = props;
  return (
    <div>
      <div className={'mt-7 mb-[53px] flex flex-col items-center justify-center gap-y-[15px]'}>
        <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
        <div className={'flex flex-col items-center justify-center'}>
          <div className={'title-l text-[var(--gray-500)]'}>검색 결과가 없어요!</div>
          <div className={'body-m text-[var(--gray-400)]'}>다른 키워드로 검색해 보세요.</div>
        </div>
      </div>
      <div className={'h-1 bg-[var(--gray-150)]'} />
      <div className={'mt-[24px] px-5'}>
        <h2 className={'title-l'}>이런 디자인은 어때요?</h2>
        <section className={'grid grid-cols-2 gap-[2px] mt-2'}>
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
        </section>
      </div>
      {/*{searchMenu === '디자인'*/}
      {/*  ? (*/}
      {/*    <section className={'grid grid-cols-2 gap-[2px] gap-y-5'}>*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*      <DesignCard />*/}
      {/*    </section>*/}
      {/*  ) : (*/}
      {/*    <section className={'flex flex-col gap-y-4 py-2 pl-5'}>*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*      <StoreCard />*/}
      {/*    </section>*/}
      {/*)}*/}
    </div>
  );
};
export default DesignSearchResult;
