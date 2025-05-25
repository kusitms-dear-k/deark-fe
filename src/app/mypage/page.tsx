'use client'
import Image from 'next/image'
import { BlueClipboardIcon, BluePencilIcon, BlueSendIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/common/NavBar'
import { useEffect, useState } from 'react'
import { RecommendType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { getDesignRecommendData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import RecommendCard from '@/components/search/RecommendCard'
import RecommendCardSkeleton from '@/components/skeleton/RecommendCardSkeleton'
import DesignCard from '@/components/search/DesignCard'
import { useOrderStore } from '@/store/orderStore'
import Order from '@/components/order/Order'

const MyPage = () => {
  const router = useRouter()
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
    <main className="relative">
      <div className="w-full bg-gray-100 px-[1.25rem]">
        <section className="flex justify-between pt-[4.688rem]">
          <div className="flex items-center justify-center gap-x-[0.75rem]">
            <div className="relative h-[2.5rem] w-[2.5rem]">
              <Image src={'/common/cake1.png'} alt={'케이크'} fill className="rounded-full object-cover" />
            </div>
            <p className="title-l">리무진님의 마이페이지</p>
          </div>
        </section>
        <section className="flex flex-col pt-[2.875rem] pb-[4rem]">
          <p className="title-l text-blue-400">D-13 "큐시즘의 밤!"</p>
          <p className="body-l-m text-gray-800">
            <span className="title-l">“큐시즘 밤”</span>만의 특별함을 담아보세요!
          </p>
        </section>
      </div>
      <section className="border-gray-150 absolute top-[15.313rem] right-5 left-5 flex items-center justify-between justify-center gap-x-[1.25rem] rounded-[0.5rem] border bg-white px-[1.25rem] py-[1rem]">
        <div
          onClick={() => {
            router.push('/mypage/order')
          }}
          className="flex w-[5rem] flex-col items-center justify-center gap-y-[0.25rem]"
        >
          <BlueSendIcon width={16} height={16} />
          <p className="title-m flex gap-x-[0.25rem]">제작 문의</p>
        </div>
        <div className="border-gray-150 h-[2rem] border-r" />
        <div
          onClick={() => {
            router.push('/mypage/approve')
          }}
          className="flex w-[5rem] flex-col items-center justify-center gap-y-[0.25rem]"
        >
          <BlueClipboardIcon width={16} height={16} />
          <p className="title-m flex gap-x-[0.25rem]">픽업 확정</p>
        </div>
        <div className="border-gray-150 h-[2rem] border-r" />
        <div
          onClick={() => {
            router.push('/mypage/review')
          }}
          className="flex w-[5rem] flex-col items-center justify-center gap-y-[0.25rem]"
        >
          <BluePencilIcon width={16} height={16} />
          <p className="title-m flex gap-x-[0.25rem]">리뷰</p>
        </div>
      </section>

      <section className="mt-[3.75rem] p-[1rem]">
        <h3 className="title-l text-gray-900">최근 본 케이크</h3>
        <section className="mt-[0.5rem] flex flex-nowrap gap-x-[0.125rem] overflow-x-scroll">
          <div className="min-w-[12.125rem]">
            <DesignCard
              onCardClick={() => {}}
              description="심플감성 스타일 레터링케이크"
              storeName="무무케이크"
              isHeart={false}
              img={'/common/cake1.png'}
              enableDayOrder={true}
            />
          </div>
          <div className="min-w-[12.125rem]">
            <DesignCard
              onCardClick={() => {}}
              description="심플감성 스타일 레터링케이크"
              storeName="무무케이크"
              isHeart={false}
              img={'/common/cake1.png'}
            />
          </div>
          <div className="min-w-[12.125rem]">
            <DesignCard
              onCardClick={() => {}}
              description="심플감성 스타일 레터링케이크"
              storeName="무무케이크"
              isHeart={false}
              img={'/common/cake1.png'}
            />
          </div>
        </section>
      </section>

      <section className="mb-[6.25rem] p-[1rem]">
        <h3 className="title-l text-gray-900">추천 케이크</h3>
        <section className="mt-[0.5rem] grid grid-cols-2 gap-[0.125rem]">
          {recommendResults
            ? recommendResults.map((recommendResult) => {
                return (
                  <RecommendCard
                    isGradient={false}
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
            : //skeleton-ui
              [1, 2, 3, 4].map((i) => {
                return <RecommendCardSkeleton key={i} />
              })}
        </section>
      </section>
      <NavBar />
    </main>
  )
}
export default MyPage
