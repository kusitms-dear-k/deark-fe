'use client'
import Image from 'next/image'
import { BlueCheckCircleIcon, BlueClipboardIcon, BluePencilIcon, LogoutIcon } from '@/assets/svgComponents'
import { useRouter } from 'next/navigation'
import NavBar from '@/components/common/NavBar'
import { useEffect, useState } from 'react'
import { RecommendType } from '@/types/search'
import { useSearchStore } from '@/store/searchStore'
import { getDesignRecommendData } from '@/api/searchAPI'
import { ResponseType } from '@/types/common'
import RecommendCardSkeleton from '@/components/skeleton/RecommendCardSkeleton'
import DesignCard from '@/components/search/DesignCard'
import Cookies from 'js-cookie'
import LogoutModal from '@/components/mypage/LogoutModal'
import { useLoginStore } from '@/store/authStore'
import RequireLoginModal from '@/components/mypage/RequireLoginModal'
import OrderSubmissionSuccessModal from '@/components/order/OrderSubmissionSuccessModal'
import { AnimatePresence } from 'framer-motion'
import Filter from '@/components/common/Filter'
import StoreDetail from '@/components/search/StoreDetail'
import DesignDetailContent from '@/components/search/DesignDetailContent'
import useSearchResult from '@/hooks/useSearchResult'
import { Drawer } from '@/components/ui/drawer'
import { addRecentlyViewedDesign } from '@/utils/common/function'
import OrderForm from '@/components/order/OrderForm'
import UpcomingEventBanner from '@/components/mypage/UpcomingEventBanner'
import { getUpcomingEvent } from '@/api/mypageAPI'
import { UpcomingEventType } from '@/types/mypage'

const MyPage = () => {
  const router = useRouter()
  const [recommendResults, setRecommendResults] = useState<RecommendType[]>()
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const user = useLoginStore((state) => state.user)
  const token = Cookies.get('ACCESS_TOKEN')
  const [hasMounted, setHasMounted] = useState(false)
  const [parsedRecentlyViewedDesigns, setParsedRecentlyViewedDesigns] = useState<RecommendType[]>([])
  const [upcomingEvent, setUpcomingEvent] = useState<UpcomingEventType>()
  const setLoginStoreState = useLoginStore((state) => state.setState)

  const {
    isStoreDetailModalOpen,
    isDesignDetailModalOpen,
    isOrderFormOpen,
    isFilterModalOpen,
    isOrderSubmissionSuccessModalOpen,
    setIsFilterModalOpen,
    selectedFilterType,
    storeDetailMenu,
    setStoreDetailMenu,
    designDetail,
    setState,
    renderFilterContent,
    resetOrderForm,
  } = useSearchResult()

  useEffect(() => {
    setHasMounted(true)

    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('recentlyViewedDesigns')
      if (data) {
        try {
          setParsedRecentlyViewedDesigns(JSON.parse(data))
        } catch (e) {
          console.error('localStorage 파싱 실패:', e)
        }
      }
    }
  }, [])

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    // 1. 초기 상태 실행
    getDesignRecommendData(4)
      .then((res: ResponseType<{ designList: RecommendType[] }>) => {
        console.log('검색 결과 없을 경우 추천', res)
        setRecommendResults(res.results.designList)
      })
      .catch(console.error)
    getUpcomingEvent().then((res: ResponseType<UpcomingEventType>) => {
      console.log('다가오는 이벤트', res)
      setUpcomingEvent(res.results)
    })
  }, [])

  const handleLogout = () => {
    Cookies.remove('REFRESH_TOKEN')
    Cookies.remove('ACCESS_TOKEN')
    Cookies.remove('kakaoAccessToken')
    Cookies.remove('ROLE')
    router.push('/')
    localStorage.removeItem('login-store')
    localStorage.removeItem('recentlyViewedDesigns')
    setLoginStoreState({ user: null })
  }

  // 2초 후 자동 닫힘 처리
  useEffect(() => {
    if (isOrderSubmissionSuccessModalOpen) {
      const timer = setTimeout(() => {
        setState({ isOrderSubmissionSuccessModalOpen: false })
        //초기화
        resetOrderForm()
      }, 2000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isOrderSubmissionSuccessModalOpen, setState])

  if (!hasMounted) return null // 또는 로딩 UI

  return isOrderFormOpen ? (
    <OrderForm />
  ) : (
    <main className="relative">
      <Drawer
        open={isStoreDetailModalOpen || isDesignDetailModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            if (isStoreDetailModalOpen) {
              setSearchParams({ isStoreDetailModalOpen: false })
            }
            if (isDesignDetailModalOpen) {
              setSearchParams({ isDesignDetailModalOpen: false })
            }
          }
        }}
      >
        {isLogoutModalOpen && <LogoutModal onClick={() => setIsLogoutModalOpen(false)} handleLogout={handleLogout} />}
        {!token && <RequireLoginModal onClick={() => {}} />}
        {/* 주문서 문의가 완료될 때 보이는 모달 */}
        {isOrderSubmissionSuccessModalOpen && (
          <OrderSubmissionSuccessModal onClick={() => setState({ isOrderSubmissionSuccessModalOpen: false })} />
        )}
        {/* 필터 모달 */}
        <AnimatePresence>
          {isFilterModalOpen && (
            <Filter setIsFilterModalOpen={setIsFilterModalOpen}>{renderFilterContent(selectedFilterType)}</Filter>
          )}
        </AnimatePresence>

        {/* 가게 상세 페이지 모달 */}
        {isStoreDetailModalOpen && (
          <StoreDetail setStoreDetailMenu={setStoreDetailMenu} storeDetailMenu={storeDetailMenu} />
        )}

        {/* 디자인 상세 페이지 모달 */}
        {isDesignDetailModalOpen && <DesignDetailContent designDetail={designDetail} />}
      </Drawer>

      {/* 프로필 관련 */}
      <div className="bg-gray-100 px-5 pb-6">
        <header className="title-xl pt-[74px] pb-[27px]">마이페이지</header>
        <div className="flex items-center gap-x-3">
          <div className="relative h-[34px] w-[34px]">
            <Image
              src={user ? user.profileImageUrl : '/common/profile_icon.svg'}
              alt="케이크"
              fill
              className="rounded-full object-cover"
            ></Image>
          </div>
          <p className="title-m">{user && user.nickname}님 안녕하세요!</p>
        </div>
        <UpcomingEventBanner upcomingEvent={upcomingEvent} />
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
        {parsedRecentlyViewedDesigns.length > 0 && (
          <>
            <h3 className="title-l text-gray-900">최근 본 케이크</h3>
            <section className="scrollbar-hide mt-[0.5rem] flex flex-nowrap gap-x-[0.125rem] overflow-x-scroll">
              {parsedRecentlyViewedDesigns.map((design: RecommendType) => {
                return (
                  <div key={design.designId} className="min-w-[12.125rem]">
                    <DesignCard
                      onCardClick={() => {
                        setSearchParams({
                          designId: design.designId,
                          isDesignDetailModalOpen: true,
                          isStoreDetailModalOpen: false,
                        })
                        addRecentlyViewedDesign(
                          design.designId,
                          design.designName,
                          design.designImageUrl,
                          design.storeName,
                          design.isLiked
                        )
                      }}
                      isHeartContent={false}
                      description={design.designName}
                      storeName={design.storeName}
                      isHeart={design.isLiked}
                      img={design.designImageUrl}
                    />
                  </div>
                )
              })}
            </section>
          </>
        )}
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
                      onCardClick={() => {
                        setSearchParams({
                          designId: recommendResult.designId,
                          isDesignDetailModalOpen: true,
                          isStoreDetailModalOpen: false,
                        })
                        addRecentlyViewedDesign(
                          recommendResult.designId,
                          recommendResult.designName,
                          recommendResult.designImageUrl,
                          recommendResult.storeName,
                          recommendResult.isLiked
                        )
                      }}
                      isHeartContent={false}
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
