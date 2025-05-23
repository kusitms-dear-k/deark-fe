'use client'

import Header from '@/components/common/Header'
import Filter from '@/components/common/Filter'
import DesignDetailContent from '@/components/search/DesignDetailContent'
import { AnimatePresence } from 'framer-motion'
import StoreDetail from '@/components/search/StoreDetail'
import OrderForm from '@/components/order/OrderForm'
import GATracker from '@/components/GATracker'
import SearchContent from '@/components/search/SearchContent'
import useSearchResult from '@/hooks/useSearchResult'
import { useRouter } from 'next/navigation'
import { KeywordDeleteIcon } from '@/assets/svgComponents'
import useScrollDirection from '@/hooks/useScrollDirection'
import {
  Drawer
} from '@/components/ui/drawer'
import { useEffect } from 'react'


const SearchPage = () => {
  const router = useRouter()
  const {
    isStoreDetailModalOpen,
    isDesignDetailModalOpen,
    isOrderFormOpen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    selectedFilterType,
    setSelectedFilterType,
    storeDetailMenu,
    setStoreDetailMenu,
    totalCount,
    keyword,
    setSearchParams,
    designDetail,
    renderFilterContent,
  } = useSearchResult()

  const scrollDirection = useScrollDirection()
  const isScrollingDown = scrollDirection === 'down'

  useEffect(() => {
    console.log('isStoreDetailModalOpen', isStoreDetailModalOpen)
  }, [isStoreDetailModalOpen])

  return (
    <main className="flex min-h-screen flex-col">
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
        <GATracker />
        {/* 주문서 작성 폼 모달 */}
        {isOrderFormOpen ? (
          <OrderForm />
        ) : (
          <>
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
            {isDesignDetailModalOpen && (
              <DesignDetailContent designDetail={designDetail} />
            )}
            <Header
              headerClassname={'fixed bg-white'}
              headerType="SEARCH"
              keyword={keyword}
              onBack={() => {
                setSearchParams({ keyword: null })
                setSearchParams({ isTotalSearchPageOpen: false })
                router.back()
              }}
              RightIcon={
                <KeywordDeleteIcon
                  onClick={() => {
                    router.back()
                    setSearchParams({ keyword: '' })
                    setSearchParams({ isTotalSearchPageOpen: true })
                  }}
                  width={16}
                  height={16}
                />
              }
            />
            <SearchContent
              FilterPanelClassname={
                isScrollingDown
                  ? 'transition-all duration-100 fixed opacity-0 top-[11.063rem]'
                  : 'transition-all duration-100 fixed opacity-100 top-[11.063rem]'
              }
              isFilterModalOpen={isFilterModalOpen}
              selectedFilterType={selectedFilterType}
              setSelectedFilterType={setSelectedFilterType}
              setIsFilterModalOpen={setIsFilterModalOpen}
              totalCount={totalCount}
            />
          </>
        )}
      </Drawer>

    </main>
  )
}
export default SearchPage
