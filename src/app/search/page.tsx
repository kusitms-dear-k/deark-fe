'use client'

import Header from '@/components/common/Header'
import Filter from '@/components/common/Filter'
import { AnimatePresence } from 'framer-motion'
import GATracker from '@/components/GATracker'
import SearchContent from '@/components/search/SearchContent'
import useSearchResult from '@/hooks/useSearchResult'
import { useRouter } from 'next/navigation'
import { KeywordDeleteIcon } from '@/assets/svgComponents'
import useScrollDirection from '@/hooks/useScrollDirection'
import NavBar from '@/components/common/NavBar'

const SearchPage = () => {
  const router = useRouter()
  const {
    isFilterModalOpen,
    setIsFilterModalOpen,
    selectedFilterType,
    setSelectedFilterType,
    totalCount,
    keyword,
    setSearchParams,
    renderFilterContent,
    hasUserSelectedPrice,
  } = useSearchResult()

  const scrollDirection = useScrollDirection()
  const isScrollingDown = scrollDirection === 'down'

  return (
    <main className="flex min-h-screen flex-col">
      <div>
        <GATracker />
        <>
          {/* 필터 모달 */}
          <AnimatePresence>
            {isFilterModalOpen && (
              <Filter setIsFilterModalOpen={setIsFilterModalOpen}>{renderFilterContent(selectedFilterType)}</Filter>
            )}
          </AnimatePresence>

          <Header
            headerClassname={'fixed bg-white'}
            headerType="SEARCH"
            keyword={keyword}
            onBack={() => {
              setSearchParams({ keyword: null, isTotalSearchPageOpen: false, searchMenu: '디자인' })
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
            hasUserSelectedPrice={hasUserSelectedPrice}
          />
        </>
      </div>
      <NavBar />
    </main>
  )
}
export default SearchPage
