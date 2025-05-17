import { Dispatch, SetStateAction } from 'react'

import Header from '@/components/common/Header'
import RecentSearchList from '@/components/search/RecentSearchList'
import RecommendedSearchList from '@/components/search/RecommendedSearchList'
import { useRouter } from 'next/navigation'

interface Props {
  setIsTotalSearchPage: Dispatch<SetStateAction<boolean>>
}

const TotalSearchPage = (props: Props) => {
  const { setIsTotalSearchPage } = props
  const router = useRouter()

  const textList = [
    '젠더리빌 케이크',
    '엄마아빠 로또케이크',
    '만원대 케이크',
    '반려동물 케이크',
    '생화 케이크',
    '당일예약 케이크',
  ]

  return (
    <>
      <Header
        onClick={() => {
          router.push('/search')
        }}
        headerType={'SEARCH'}
        onBack={() => {
          setIsTotalSearchPage(false)
        }}
      />
      <main className={'mt-[9.375rem] flex flex-col gap-y-6 px-5'}>
        <RecommendedSearchList recommendedSearchList={textList} />
        <RecentSearchList recentSearchList={[]} />
      </main>
    </>
  )
}
export default TotalSearchPage
