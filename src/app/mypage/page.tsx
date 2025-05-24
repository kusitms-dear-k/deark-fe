'use client'
import Image from 'next/image'
import {
  BlueCheckCircleIcon,
  BlueClipboardIcon,
  BluePencilIcon,
  BlueSendIcon,
  LogoutIcon,
} from '@/assets/svgComponents'
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
import Cookies from 'js-cookie'
import { PencilIcon } from 'lucide-react'
import LogoutModal from '@/components/mypage/LogoutModal'

const MyPage = () => {
  const router = useRouter()
  const [recommendResults, setRecommendResults] = useState<RecommendType[]>()
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  useEffect(() => {
    // 1. 초기 상태 실행
    getDesignRecommendData(4)
      .then((res: ResponseType<{ designList: RecommendType[] }>) => {
        console.log('검색 결과 없을 경우 추천', res)
        setRecommendResults(res.results.designList)
      })
      .catch(console.error)
  }, [])

  const handleLogout = () => {
    Cookies.remove('REFRESH_TOKEN')
    Cookies.remove('ACCESS_TOKEN')
    Cookies.remove('kakaoAccessToken')
    Cookies.remove('ROLE')
  }

  return (
    <main className="relative">
      {isLogoutModalOpen && <LogoutModal onClick={() => setIsLogoutModalOpen(false)} handleLogout={handleLogout} />}
      {/* 프로필 관련 */}
      <div className="bg-gray-100 px-5 pb-6">
        <header className="title-xl pt-[74px] pb-[27px]">마이페이지</header>
        <div className="flex items-center gap-x-3">
          <div className="relative h-[34px] w-[34px]">
            <Image src={'/common/profile.svg'} alt="케이크" fill className="object-cover"></Image>
          </div>
          <p className="title-m">리무진님 안녕하세요!</p>
        </div>
        <div className="relative mt-4 rounded-[8px] bg-white px-5 py-4">
          <Image src={'/common/glitter-group-icon.svg'} alt="글리터" fill className="object-cover px-[25px]" />
          <div className="title-l text-gray-800">아직 이벤트가 없네요.</div>
          <p className="body-s-m text-gray-700">이벤트는 찜하기 {'>'} ‘새 이벤트 생성하기’로 만들 수 있어요.</p>
        </div>
      </div>

      <div className="border-gray-150 absolute top-68 right-5 left-5 flex items-center justify-between rounded-[8px] border bg-white px-5 py-4">
        <button
          onClick={() => {
            router.push('/mypage/order')
          }}
          className="flex w-[80px] flex-col items-center gap-y-1"
        >
          <BlueClipboardIcon width={16} height={16} />
          <p className="title-m text-gray-700">문의 내역</p>
        </button>
        <div className="border-gray-150 h-[32px] w-[1px] border-r" />
        <button
          onClick={() => {
            router.push('/mypage/approve')
          }}
          className="flex w-[80px] flex-col items-center gap-y-1"
        >
          <BlueCheckCircleIcon width={16} height={16} />
          <p className="title-m text-gray-700">픽업 확정</p>
        </button>
        <div className="border-gray-150 h-[32px] w-[1px] border-r" />
        <button
          onClick={() => {
            router.push('/mypage/review')
          }}
          className="flex w-[80px] flex-col items-center gap-y-1"
        >
          <BluePencilIcon width={16} height={16} />
          <p className="title-m text-gray-700">리뷰</p>
        </button>
      </div>

      {/* 최근 본 케이크 */}
      <section className="mt-[3.75rem] p-[1rem]">
        <h3 className="title-l text-gray-900">최근 본 케이크</h3>
        <section className="scrollbar-hide mt-[0.5rem] flex flex-nowrap gap-x-[0.125rem] overflow-x-scroll">
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

      {/* 추천 케이크 */}
      <section className="border-b-[7px] border-gray-100 p-[1rem]">
        <h3 className="title-l text-gray-900">추천 케이크</h3>
        <section className="mt-[0.5rem] flex flex-nowrap gap-x-[0.125rem] overflow-x-scroll">
          {recommendResults
            ? recommendResults.map((recommendResult) => {
                return (
                  <div key={recommendResult.designId} className="scrollbar-hide min-w-[12.125rem]">
                    <DesignCard
                      onCardClick={() => {}}
                      description={recommendResult.designName}
                      storeName={recommendResult.storeName}
                      isHeart={recommendResult.isLiked}
                      img={recommendResult.designImageUrl}
                    />
                  </div>
                )
              })
            : //skeleton-ui
              [1, 2, 3, 4].map((i) => {
                return <RecommendCardSkeleton key={i} />
              })}
        </section>
      </section>
      <button
        onClick={() => {
          setIsLogoutModalOpen(true)
        }}
        className="body-m-m mt-1 flex gap-x-1 px-5 py-3 text-gray-700"
      >
        <LogoutIcon width={24} height={24} />
        로그아웃
      </button>
      <div className="h-[6.25rem]" />
      <NavBar />
    </main>
  )
}
export default MyPage
