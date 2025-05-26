import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/store/searchStore'

interface Props {
  recommendedSearchList: string[]
  addRecentKeyword: (keyword: string) => void
}

const RecommendedSearchList = (props: Props) => {
  const { recommendedSearchList, addRecentKeyword } = props
  const router = useRouter()
  const setSearchParams = useSearchStore((state) => state.setSearchParams)
  return (
    <section className={'flex flex-col gap-y-3'}>
      <h2 className={'title-l'}>추천 검색어</h2>
      <div className={'flex flex-wrap gap-x-[6px] gap-y-2'}>
        {recommendedSearchList.map((recommendedSearchText) => {
          return (
            <div
              onClick={() => {
                setSearchParams({ keyword: recommendedSearchText })
                addRecentKeyword(recommendedSearchText)
                router.push('/search')
              }}
              key={recommendedSearchText}
              className={'body-s w-fit rounded-full bg-[var(--gray-100)] px-3 py-[6px] text-[var(--gray-500)]'}
            >
              {recommendedSearchText}
            </div>
          )
        })}
      </div>
    </section>
  )
}
export default RecommendedSearchList
