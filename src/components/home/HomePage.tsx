'use client'

import Header from '@/components/common/Header'
import NavBar from '@/components/common/NavBar'
import SearchInput from '@/components/home/SearchInput'
import { RedSearchIcon } from '@/assets/svgComponents'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GuardianModal from '@/components/authentication/GuardianModal'
import TotalSearchPage from '@/components/search/TotalSearchPage'
import { useLoginStore } from '@/store/authStore'
import SearchContent from '@/components/search/SearchContent'
import WelcomeModal from '@/components/authentication/WelcomeModal'
import useScrollDirection from '@/hooks/useScrollDirection'
import Filter from '@/components/common/Filter'
import StoreDetail from '@/components/search/StoreDetail'
import DesignDetailContent from '@/components/search/DesignDetailContent'
import useSearchResult from '@/hooks/useSearchResult'
import OrderForm from '@/components/order/OrderForm'
import { useSearchStore } from '@/store/searchStore'
import { Drawer } from '@/components/ui/drawer'
import OrderSubmissionSuccessModal from '@/components/order/OrderSubmissionSuccessModal'
import Onboarding from '@/components/onboarding/Onboarding'
import OrderExitConfirmModal from '@/components/mypage/OrderExitConfirmModal'
import { useOrderStore } from '@/store/orderStore'

const HomePage = () => {
  const isTotalSearchPageOpen = useSearchStore((state) => state.isTotalSearchPageOpen)

  const setLoginState = useLoginStore((state) => state.setState)
  const isWelcomeModalOpen = useLoginStore((state) => state.isWelcomeModalOpen)
  const isGuardianModalOpen = useLoginStore((state) => state.isGuardianModalOpen)

  const {
    isStoreDetailModalOpen,
    isDesignDetailModalOpen,
    isFilterModalOpen,
    isOrderFormOpen,
    setIsFilterModalOpen,
    selectedFilterType,
    setSelectedFilterType,
    storeDetailMenu,
    setStoreDetailMenu,
    totalCount,
    setSearchParams,
    designDetail,
    renderFilterContent,
    keyword,
    isOrderSubmissionSuccessModalOpen,
    setState,
    resetOrderForm,
    hasUserSelectedPrice,
  } = useSearchResult()

  // ✅ 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isWelcomeModalOpen) {
      const timer = setTimeout(() => {
        setLoginState({ isWelcomeModalOpen: false, isGuardianModalOpen: true })
      }, 2000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isWelcomeModalOpen, setState])

  // 3초 후 자동 닫힘 처리
  useEffect(() => {
    if (isOrderSubmissionSuccessModalOpen) {
      const timer = setTimeout(() => {
        setState({ isOrderSubmissionSuccessModalOpen: false })
        //초기화
        resetOrderForm()
      }, 3000)

      return () => clearTimeout(timer) // cleanup
    }
  }, [isOrderSubmissionSuccessModalOpen, setState])

  const scrollDirection = useScrollDirection()

  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isGuardianModalOpen ? (
    <AnimatePresence>
      <Onboarding />
    </AnimatePresence>
  ) : isTotalSearchPageOpen ? (
    <TotalSearchPage keyword={keyword} />
  ) : isOrderFormOpen ? (
    <OrderForm />
  ) : (
    <main className="bg-bg-300 relative min-h-screen">
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
        {/* 주문서 문의가 완료될 때 보이는 모달 */}
        {isOrderSubmissionSuccessModalOpen && (
          <OrderSubmissionSuccessModal onClick={() => setState({ isOrderSubmissionSuccessModalOpen: false })} />
        )}

        {/* 회원가입 환영 모달 */}
        {isWelcomeModalOpen && (
          <AnimatePresence>
            {isWelcomeModalOpen && <WelcomeModal onClick={() => setLoginState({ isWelcomeModalOpen: false })} />}
          </AnimatePresence>
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

        <AnimatePresence>
          {isAtTop && (
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.01 }}
              className="bg-bg-300 fixed top-0 right-0 left-0 z-30"
            >
              <Header headerType={'DEFAULT'} headerClassname={'bg-bg-300 fixed'} />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={`z-40 w-full px-5 pt-2 pb-4 transition-all duration-300 ${
            !isAtTop ? 'bg-bg-300 fixed top-0 pt-[1.563rem]' : 'fixed top-40 z-10 bg-transparent'
          }`}
        >
          <SearchInput
            onClick={() => {
              setSearchParams({ isTotalSearchPageOpen: true })
            }}
            LeftIcon={<RedSearchIcon width={24} height={24} />}
            className="w-full bg-white"
          />
        </div>

        <div
          className={`absolute mt-10 w-full bg-white transition-all duration-300 ${
            scrollDirection === 'down' ? 'bottom-0 h-[60%]' : 'top-[9.75rem] bottom-0 rounded-t-[2rem]'
          }`}
        >
          <SearchContent
            hasUserSelectedPrice={hasUserSelectedPrice}
            searchMenuClassname={
              !isAtTop ? 'transition-all duration-300 fixed top-23' : 'transition-all duration-300 fixed top-60'
            }
            FilterPanelClassname={
              !isAtTop ? 'transition-all duration-300 fixed top-34' : 'transition-all duration-300 fixed top-71'
            }
            SearchSummaryPanelClassname={!isAtTop ? 'mt-5' : 'mt-[9.375rem]'}
            isFilterModalOpen={isFilterModalOpen}
            selectedFilterType={selectedFilterType}
            setSelectedFilterType={setSelectedFilterType}
            setIsFilterModalOpen={setIsFilterModalOpen}
            totalCount={totalCount}
          />
        </div>
        <NavBar />
      </Drawer>
    </main>
  )
}
export default HomePage
