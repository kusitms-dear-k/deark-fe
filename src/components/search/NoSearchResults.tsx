import Image from 'next/image'
import RecommendCard from '@/components/search/RecommendCard'
import { useEffect, useState } from 'react'
import { getDesignRecommendData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import { RecommendType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'

const NoSearchResults = () => {
  const [recommendResults, setRecommendResults] = useState<RecommendType[]>()
  const setSearchParams = useSearchStore((state) => state.setSearchParams)

  useEffect(() => {
    // 1. 초기 상태 실행
    getDesignRecommendData(4)
      .then((res: ResponseType<{ designList: RecommendType[] }>) => {
        console.log('검색 결과 없을 경우 추천', res)
        setRecommendResults(res.results.designList)
      })
      .catch(console.error)
  }, [])

  return (
    <>
      <div className="mt-7 mb-[3.313rem] flex flex-col items-center justify-center gap-y-[0.938rem]">
        <Image src={'/search/memo.svg'} width={28} height={32} alt={'메모'} style={{ width: 28, height: 32 }} />
        <div className="flex flex-col items-center justify-center">
          <div className="title-l text-gray-500">검색 결과가 없어요!</div>
          <div className="body-m text-gray-400">다른 키워드로 검색해 보세요.</div>
        </div>
      </div>
      <div className="bg-gray-150 h-[0.25rem]" />
      <div className="mt-[1.5rem] px-[1.25rem] pb-[5.625rem]">
        <h2 className="title-l">이런 디자인은 어때요?</h2>
        <section className="mt-[0.5rem] grid grid-cols-2 gap-[0.125rem]">
          {recommendResults ? (
            recommendResults.map((recommendResult) => {
              return (
                <RecommendCard
                  onCardClick={() => {
                    setSearchParams({
                      designId: recommendResult.designId,
                      isDesignDetailModalOpen: true,
                    })
                  }}
                  {...recommendResult}
                  key={recommendResult.designId}
                />
              )
            })
          ) : (
            //skeleton-ui
            <div></div>
          )}
        </section>
      </div>
    </>
  )
}
export default NoSearchResults
