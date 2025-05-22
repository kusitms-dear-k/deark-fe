'use client'

import Header from '@/components/common/Header'
import Filter from '@/components/common/Filter'
import BottomModal from '@/components/common/BottomModal'
import DesignDetailContent from '@/components/search/DesignDetailContent'
import { AnimatePresence } from 'framer-motion'
import StoreDetail from '@/components/search/StoreDetail'
import OrderForm from '@/components/order/OrderForm'
import GATracker from '@/components/GATracker'
import SearchContent from '@/components/search/SearchContent'
import useSearchResult from '@/hooks/useSearchResult'
import { useRouter } from 'next/navigation'
import { KeywordDeleteIcon } from '@/assets/svgComponents'

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

  return (
    <main className="flex min-h-screen flex-col">
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
            <AnimatePresence>
              <BottomModal onClick={() => setSearchParams({ isStoreDetailModalOpen: false })}>
                <StoreDetail setStoreDetailMenu={setStoreDetailMenu} storeDetailMenu={storeDetailMenu} />
              </BottomModal>
            </AnimatePresence>
          )}

          {/* 디자인 상세 페이지 모달 */}
          {isDesignDetailModalOpen && (
            <AnimatePresence>
              <BottomModal onClick={() => setSearchParams({ isDesignDetailModalOpen: false })}>
                <DesignDetailContent designDetail={designDetail} />
              </BottomModal>
            </AnimatePresence>
          )}
          <Header
            headerType="SEARCH"
            keyword={keyword}
            onBack={() => {
              router.back()
              setSearchParams({ keyword: null })
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
            isFilterModalOpen={isFilterModalOpen}
            selectedFilterType={selectedFilterType}
            setSelectedFilterType={setSelectedFilterType}
            setIsFilterModalOpen={setIsFilterModalOpen}
            totalCount={totalCount}
          />
        </>
      )}
    </main>
  )
}
export default SearchPage
