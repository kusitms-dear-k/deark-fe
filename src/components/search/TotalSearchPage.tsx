import Header from '@/components/common/Header'
import RecentSearchList from '@/components/search/RecentSearchList'
import RecommendedSearchList from '@/components/search/RecommendedSearchList'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/store/searchStore'
import { SearchIconRed } from '@/assets/svgComponents'
import { useEffect, useRef, useState } from 'react'

interface Props {
  keyword: string | null
}

const TotalSearchPage = (props: Props) => {
  const { keyword } = props
  const [recentKeywords, setRecentKeywords] = useState<string[]>([])
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const router = useRouter()

  const RECENT_KEYWORDS_KEY = 'recent_keywords'

  /**
   * 최근 검색어 가져오는 함수
   */
  const getRecentKeywords = (): string[] => {
    const data = localStorage.getItem(RECENT_KEYWORDS_KEY)
    return data ? JSON.parse(data) : []
  }

  /**
   * 로컬 스토리지에 저장하는 함수
   * @param keyword 키워드
   */
  const addRecentKeyword = (keyword: string) => {
    const current = getRecentKeywords()
    const filtered = current.filter((item) => item !== keyword)
    const updated = [keyword, ...filtered].slice(0, 10) // 최대 10개 유지
    localStorage.setItem(RECENT_KEYWORDS_KEY, JSON.stringify(updated))
  }

  /**
   * enter 키를 눌렀을 떄 발생하는 events
   */
  const handleSearchConfirm = () => {
    if (keyword && keyword.trim().length > 0) {
      addRecentKeyword(keyword.trim())
      setSearchParams({ isTotalSearchPageOpen: false })
      router.push('/search')
    }
  }

  /**
   * keyword 전체 다 clear 하는 함수
   */
  const handleClearRecentKeywords = () => {
    localStorage.removeItem('recent_keywords')
    setRecentKeywords([])
  }

  /**
   * 특정 키워드만 지워주는 함수
   * @param keywordToRemove 지울 키워드
   */
  const handleRemoveKeyword = (keywordToRemove: string) => {
    const updated = recentKeywords.filter((k) => k !== keywordToRemove)
    localStorage.setItem('recent_keywords', JSON.stringify(updated))
    setRecentKeywords(updated)
  }

  useEffect(() => {
    setRecentKeywords(getRecentKeywords())
  }, [])

  const textList = [
    '젠더리빌 케이크',
    '엄마아빠 로또케이크',
    '만원대 케이크',
    '반려동물 케이크',
    '생화 케이크',
    '당일예약 케이크',
  ]

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 0) // or 100ms

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header
        headerClassname={'fixed'}
        inputRef={inputRef}
        onKeyDown={handleSearchConfirm}
        keyword={keyword}
        headerType={'SEARCH'}
        onBack={() => {
          setSearchParams({ isTotalSearchPageOpen: false })
        }}
        RightIcon={
          <div onClick={handleSearchConfirm} className="flex items-center gap-x-[0.75rem]">
            <div className="h-[1rem] border-l border-gray-300" />
            <SearchIconRed width={24} height={24} />
          </div>
        }
      />
      <main className={'mt-[9.375rem] flex flex-col gap-y-6 px-5'}>
        <RecommendedSearchList recommendedSearchList={textList} addRecentKeyword={addRecentKeyword} />
        <RecentSearchList
          recentSearchList={recentKeywords}
          onClear={handleClearRecentKeywords}
          onRemove={handleRemoveKeyword}
        />
      </main>
    </>
  )
}
export default TotalSearchPage
