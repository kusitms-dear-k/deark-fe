import Header from '@/components/common/Header'
import RecentSearchList from '@/components/search/RecentSearchList'
import RecommendedSearchList from '@/components/search/RecommendedSearchList'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/store/searchStore'
import { SearchIconRed } from '@/assets/svgComponents'
import { useEffect, useRef } from 'react'

interface Props {
  keyword: string | null
}

const TotalSearchPage = (props: Props) => {
  const { keyword } = props
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  const router = useRouter()

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
        onKeyDown={() => router.push('/search')}
        keyword={keyword}
        headerType={'SEARCH'}
        onBack={() => {
          setSearchParams({ isTotalSearchPageOpen: false })
        }}
        RightIcon={
          <div
            onClick={() => {
              router.push('/search')
              setSearchParams({ isTotalSearchPageOpen: false })
            }}
            className="flex items-center gap-x-[0.75rem]"
          >
            <div className="h-[1rem] border-l border-gray-300" />
            <SearchIconRed width={24} height={24} />
          </div>
        }
      />
      <main className={'mt-[9.375rem] flex flex-col gap-y-6 px-5'}>
        <RecommendedSearchList recommendedSearchList={textList} />
        <RecentSearchList recentSearchList={[]} />
      </main>
    </>
  )
}
export default TotalSearchPage
