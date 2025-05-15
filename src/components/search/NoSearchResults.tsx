import Image from 'next/image'
import RecommendCard from '@/components/search/RecommendCard'

const NoSearchResults = () => {
  return (
    <>
      <div className={'searchResults-center mt-7 mb-[53px] flex flex-col justify-center gap-y-[15px]'}>
        <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
        <div className={'searchResults-center flex flex-col justify-center'}>
          <div className={'title-l text-[var(--gray-500)]'}>검색 결과가 없어요!</div>
          <div className={'body-m text-[var(--gray-400)]'}>다른 키워드로 검색해 보세요.</div>
        </div>
      </div>
      <div className={'h-1 bg-[var(--gray-150)]'} />
      <div className={'mt-[24px] px-5'}>
        <h2 className={'title-l'}>이런 디자인은 어때요?</h2>
        <section className={'mt-2 grid grid-cols-2 gap-[2px]'}>
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
          <RecommendCard />
        </section>
      </div>
    </>
  )
}
export default NoSearchResults
